import { getEcosystemResolver } from '../core/ecosystems/ecosystem.factory'
import type { EcosystemId } from '../core/ecosystems/ecosystem.interface'
import { fetchVulnerabilities } from '../enrichers/osv.enricher'
import { fetchDepsVulnerabilities } from '../enrichers/osv-batch.enricher'
import { fetchGithubRepo, fetchGithubReleases, extractGithubRepo } from '../enrichers/github.enricher'

const ECOSYSTEM_OSV_MAP: Record<string, string> = {
  npm: 'npm',
  packagist: 'Packagist',
  pypi: 'PyPI',
  cargo: 'crates.io',
  go: 'Go',
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const rawName = String(query.name || '')
  const ecosystem = (query.ecosystem as EcosystemId) || 'npm'
  const version = String(query.version || '') || undefined

  if (!rawName) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required (?name=)' })
  }

  const resolver = getEcosystemResolver(ecosystem)
  if (!resolver) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported ecosystem' })
  }

  const name = validatePackageName(rawName, ecosystem)

  const registry = await resolver.fetchRegistry(name, version)
  if (!registry.data) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  const reg = registry.data
  const ghRepo = extractGithubRepo(reg.repository)
  const osvEcosystem = ECOSYSTEM_OSV_MAP[ecosystem] || ecosystem
  const directDeps = reg.latest?.dependencies || {}

  const [downloads, bundle, vulns, github, releases, depsVulns] = await Promise.all([
    resolver.fetchDownloads(name),
    resolver.fetchBundle(name),
    fetchVulnerabilities(name, reg.latestVersion, osvEcosystem),
    ghRepo ? fetchGithubRepo(ghRepo) : Promise.resolve({ data: null, stale: false }),
    ghRepo ? fetchGithubReleases(ghRepo) : Promise.resolve({ data: [] as never[], stale: false }),
    fetchDepsVulnerabilities(directDeps, osvEcosystem),
  ])

  return {
    meta: { stale: registry.stale, fetchedAt: new Date().toISOString(), ecosystem },
    registry: { ...reg, installCommand: resolver.installCommand(name) },
    downloads: downloads.data,
    bundle: bundle.data,
    vulnerabilities: (vulns.data as { vulns: unknown[] } | null)?.vulns || [],
    github: github.data ? { stars: github.data.stargazers_count, forks: github.data.forks_count, openIssues: github.data.open_issues_count, pushedAt: github.data.pushed_at, repo: ghRepo } : null,
    releases: ((releases.data || []) as Array<{ tag_name: string; body: string; published_at: string; prerelease: boolean; draft: boolean }>)
      .filter((r) => !r.prerelease && !r.draft).slice(0, 15)
      .map((r) => ({ tag: r.tag_name, body: r.body || '', publishedAt: r.published_at })),
    alternatives: null,
    depsVulnerabilities: depsVulns,
  }
})
