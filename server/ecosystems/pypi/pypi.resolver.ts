import type { EcosystemResolver, RegistryResult, DownloadsResult } from '../../core/ecosystems/ecosystem.interface'
import { fetchPypiRegistry, fetchPypiDownloads } from './pypi-registry.fetcher'

function isStableVersion(v: string): boolean {
  return /^\d+\.\d+/.test(v) && !/alpha|beta|rc|dev|pre|post.*dev/i.test(v)
}

function extractRepoUrl(projectUrls: Record<string, string> | null): string | null {
  if (!projectUrls) return null
  const keys = ['Source', 'Source Code', 'Repository', 'GitHub', 'Code', 'Homepage']
  for (const key of keys) {
    for (const [k, v] of Object.entries(projectUrls)) {
      if (k.toLowerCase() === key.toLowerCase() && v.includes('github.com')) return v
    }
  }
  for (const key of keys) {
    for (const [k, v] of Object.entries(projectUrls)) {
      if (k.toLowerCase() === key.toLowerCase()) return v
    }
  }
  return projectUrls.Homepage || null
}

function parseDeps(requiresDist: string[] | null): Record<string, string> {
  if (!requiresDist) return {}
  const deps: Record<string, string> = {}
  for (const raw of requiresDist) {
    // Skip extras-only deps like: 'foo ; extra == "bar"'
    if (/;\s*extra\s*==/.test(raw)) continue
    const match = raw.match(/^([A-Za-z0-9]([A-Za-z0-9._-]*[A-Za-z0-9])?)(.*)/)
    if (!match) continue
    const name = match[1]!.toLowerCase().replace(/[_.]+/g, '-')
    const rest = match[3] || ''
    const versionMatch = rest.match(/([><=!~]=?\s*[\d.*]+)/)
    deps[name] = versionMatch ? versionMatch[1]!.trim() : '*'
  }
  return deps
}

export const pypiResolver: EcosystemResolver = {
  id: 'pypi',

  async fetchRegistry(name: string, version?: string) {
    const result = await fetchPypiRegistry(name)
    if (!result.data) return { data: null, stale: result.stale }

    const { info, releases } = result.data
    let latestVersion = info.version

    if (version) {
      const allKeys = Object.keys(releases).reverse()
      const match = allKeys.find((v) => v === version || v.startsWith(version + '.'))
      if (match) latestVersion = match
    }

    const releaseFiles = releases[latestVersion] || []
    const lastPublishDate = releaseFiles[0]?.upload_time_iso_8601 || null
    const repoUrl = extractRepoUrl(info.project_urls)
    const license = info.license && info.license !== 'UNKNOWN' ? info.license : null
    const maintainers = [info.author, info.maintainer].filter(Boolean) as string[]
    const hasTypes = info.classifiers?.some((c) => c.includes('Typing :: Typed')) || false

    const allVersionEntries = Object.entries(releases)
    const allVersions = allVersionEntries.slice(-25).reverse().map(([v, files]) => ({
      version: v,
      date: files[0]?.upload_time_iso_8601 || null,
    }))
    const stableVersions = allVersionEntries
      .filter(([v]) => isStableVersion(v))
      .slice(-25).reverse()
      .map(([v, files]) => ({ version: v, date: files[0]?.upload_time_iso_8601 || null }))

    const engines: Record<string, string> = {}
    if (info.requires_python) engines.python = info.requires_python

    return {
      data: {
        name: info.name,
        description: info.summary || '',
        latestVersion,
        license,
        lastPublishDate,
        distTags: { latest: latestVersion },
        repository: repoUrl ? { type: 'git', url: repoUrl } : null,
        maintainers,
        latest: {
          dependencies: parseDeps(info.requires_dist),
          peerDependencies: {},
          hasTypes,
          engines,
          moduleSystem: 'cjs' as const,
        },
        versions: { total: allVersionEntries.length, stable: stableVersions, all: allVersions },
      } satisfies RegistryResult,
      stale: result.stale,
    }
  },

  async fetchDownloads(name: string) {
    const result = await fetchPypiDownloads(name)
    if (!result.data) return { data: null, stale: result.stale }

    return {
      data: { weekly: result.data.data.last_week, sparkline: [] } satisfies DownloadsResult,
      stale: result.stale,
    }
  },

  async fetchBundle() {
    return { data: null, stale: false }
  },

  installCommand(name: string) {
    return `pip install ${name}`
  },

  registryUrl(name: string) {
    return `https://pypi.org/project/${name}/`
  },
}
