import { fetchNpmRegistry, fetchNpmDownloads, fetchNpmDownloadsRange } from '../../ecosystems/npm/npm-registry.fetcher'
import { fetchBundleSize } from '../../ecosystems/npm/npm-bundlephobia.fetcher'
import { fetchVulnerabilities } from '../../enrichers/osv.enricher'
import {
  fetchGithubRepo,
  fetchGithubReleases,
  extractGithubRepo,
} from '../../enrichers/github.enricher'
import { getCuratedAlternatives } from '../../data/alternatives'
import { fetchDepsVulnerabilities } from '../../enrichers/osv-batch.enricher'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required' })
  }

  // Decode scoped packages: @tanstack%2Freact-query → @tanstack/react-query
  const decodedName = decodeURIComponent(name)

  // ── Fetch registry first (required) ──
  const registry = await fetchNpmRegistry(decodedName)
  if (!registry.data) {
    throw createError({ statusCode: 404, statusMessage: `Package "${decodedName}" not found` })
  }

  const reg = registry.data
  const latestVersion = reg['dist-tags']?.latest || Object.keys(reg.versions || {}).pop() || ''
  const latestData = reg.versions?.[latestVersion]
  const repo = latestData?.repository || reg.repository
  const ghRepo = extractGithubRepo(repo)

  // ── Fetch everything else in parallel ──
  const directDeps = latestData?.dependencies || {}

  const [downloads, downloadsRange, bundle, vulns, github, releases, depsVulns] = await Promise.all([
    fetchNpmDownloads(decodedName),
    fetchNpmDownloadsRange(decodedName),
    fetchBundleSize(decodedName),
    fetchVulnerabilities(decodedName, latestVersion),
    ghRepo ? fetchGithubRepo(ghRepo) : Promise.resolve({ data: null, stale: false }),
    ghRepo ? fetchGithubReleases(ghRepo) : Promise.resolve({ data: [] as never[], stale: false }),
    fetchDepsVulnerabilities(directDeps),
  ])

  // ── Curated alternatives ──
  const curatedAlts = getCuratedAlternatives(decodedName)

  // ── Determine staleness ──
  const isStale = registry.stale || downloads.stale || bundle.stale || vulns.stale

  return {
    meta: {
      stale: isStale,
      fetchedAt: new Date().toISOString(),
    },
    registry: {
      name: reg.name,
      description: reg.description || latestData?.description || '',
      latestVersion,
      license: latestData?.license || reg.license || null,
      time: reg.time || {},
      distTags: reg['dist-tags'] || {},
      repository: repo || null,
      versions: buildVersionSummary(reg),
      maintainers: (reg.maintainers || []).map((m) => m.name),
      latest: latestData ? {
        dependencies: latestData.dependencies || {},
        peerDependencies: latestData.peerDependencies || {},
        hasTypes: !!(latestData.types || latestData.typings),
        engines: latestData.engines || {},
        moduleSystem: detectModuleSystem(latestData),
      } : null,
    },
    downloads: downloads.data ? {
      weekly: downloads.data.downloads,
      sparkline: buildSparkline(downloadsRange.data),
    } : null,
    bundle: bundle.data ? {
      size: bundle.data.size,
      gzip: bundle.data.gzip,
      dependencySizes: bundle.data.dependencySizes || [],
      installSize: bundle.data.installSize || null,
      installTime: bundle.data.installTime || null,
    } : null,
    vulnerabilities: (vulns.data as { vulns: unknown[] } | null)?.vulns || [],
    github: github.data ? {
      stars: github.data.stargazers_count,
      forks: github.data.forks_count,
      openIssues: github.data.open_issues_count,
      pushedAt: github.data.pushed_at,
      repo: ghRepo,
    } : null,
    releases: ((releases.data || []) as Array<{ tag_name: string; body: string; published_at: string; prerelease: boolean; draft: boolean }>)
      .filter((r) => !r.prerelease && !r.draft)
      .slice(0, 15)
      .map((r) => ({
        tag: r.tag_name,
        body: r.body || '',
        publishedAt: r.published_at,
      })),
    alternatives: curatedAlts,
    depsVulnerabilities: depsVulns,
  }
})

function buildSparkline(rangeData: { downloads: Array<{ downloads: number; day: string }> } | null): number[] {
  if (!rangeData?.downloads?.length) return []

  const daily = rangeData.downloads
  const weeks: number[] = []
  for (let i = 0; i < daily.length; i += 7) {
    const chunk = daily.slice(i, i + 7)
    const sum = chunk.reduce((acc, d) => acc + d.downloads, 0)
    weeks.push(sum)
  }

  return weeks
}

function detectModuleSystem(pkg: { type?: string; module?: string; exports?: unknown }): 'esm' | 'cjs' | 'dual' {
  const isEsm = pkg.type === 'module'
  const hasModuleField = !!pkg.module
  const hasExports = !!pkg.exports

  if (isEsm) return 'esm'
  if (hasModuleField || hasExports) return 'dual'
  return 'cjs'
}

function buildVersionSummary(reg: { versions?: Record<string, unknown>; time?: Record<string, string> }) {
  const all = Object.keys(reg.versions || {}).reverse()
  const stable = all.filter((v) => /^\d+\.\d+\.\d+$/.test(v))
  return {
    total: all.length,
    stable: stable.slice(0, 25).map((v) => ({
      version: v,
      date: reg.time?.[v] || null,
    })),
    all: all.slice(0, 25).map((v) => ({
      version: v,
      date: reg.time?.[v] || null,
    })),
  }
}
