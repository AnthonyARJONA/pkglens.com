import { fetchNpmRegistry, fetchNpmDownloads, fetchNpmDownloadsRange } from '../../ecosystems/npm/npm-registry.fetcher'
import { fetchBundleSize } from '../../ecosystems/npm/npm-bundlephobia.fetcher'
import { detectModuleSystem } from '../../ecosystems/npm/module-system.detector'
import { buildSparkline } from '../../ecosystems/npm/sparkline.builder'
import { buildVersionSummary } from '../../ecosystems/npm/version-summary.builder'
import { fetchVulnerabilities } from '../../enrichers/osv.enricher'
import { fetchDepsVulnerabilities } from '../../enrichers/osv-batch.enricher'
import { fetchGithubRepo, fetchGithubReleases, extractGithubRepo } from '../../enrichers/github.enricher'
import { buildBundleResponse } from './bundle-response.builder'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required' })
  }

  const decodedName = validatePackageName(decodeURIComponent(name), 'npm')
  const registry = await fetchNpmRegistry(decodedName)
  if (!registry.data) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  const reg = registry.data
  const requestedVersion = String(getQuery(event).version || '')
  let latestVersion = reg['dist-tags']?.latest || Object.keys(reg.versions || {}).pop() || ''

  // Support specific version via query param
  if (requestedVersion) {
    const allVersionKeys = Object.keys(reg.versions || {}).reverse()
    const exact = allVersionKeys.find((v) => v === requestedVersion || v === 'v' + requestedVersion)
    const prefixed = allVersionKeys.find((v) => v.replace(/^v/, '').startsWith(requestedVersion + '.') || v.replace(/^v/, '') === requestedVersion)
    if (exact) latestVersion = exact
    else if (prefixed) latestVersion = prefixed
  }

  const latestData = reg.versions?.[latestVersion]
  const ghRepo = extractGithubRepo(latestData?.repository || reg.repository)
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

  return {
    meta: {
      stale: registry.stale,
      fetchedAt: new Date().toISOString(),
    },
    registry: {
      name: reg.name,
      description: reg.description || latestData?.description || '',
      latestVersion,
      license: latestData?.license || reg.license || null,
      time: reg.time || {},
      distTags: reg['dist-tags'] || {},
      repository: latestData?.repository || reg.repository || null,
      versions: buildVersionSummary(reg),
      maintainers: (reg.maintainers || []).map((m) => m.name),
      latest: latestData ? {
        dependencies: directDeps,
        peerDependencies: latestData.peerDependencies || {},
        hasTypes: !!(latestData.types || latestData.typings),
        engines: latestData.engines || {},
        moduleSystem: detectModuleSystem(latestData),
      } : null,
    },
    downloads: downloads.data ? { weekly: downloads.data.downloads, sparkline: buildSparkline(downloadsRange.data) } : null,
    bundle: buildBundleResponse(bundle.data, latestData),
    vulnerabilities: (vulns.data as { vulns: unknown[] } | null)?.vulns || [],
    github: github.data ? { stars: github.data.stargazers_count, forks: github.data.forks_count, openIssues: github.data.open_issues_count, pushedAt: github.data.pushed_at, repo: ghRepo } : null,
    releases: ((releases.data || []) as Array<{ tag_name: string; body: string; published_at: string; prerelease: boolean; draft: boolean }>)
      .filter((r) => !r.prerelease && !r.draft).slice(0, 15)
      .map((r) => ({ tag: r.tag_name, body: r.body || '', publishedAt: r.published_at })),
    alternatives: null,
    depsVulnerabilities: depsVulns,
  }
})
