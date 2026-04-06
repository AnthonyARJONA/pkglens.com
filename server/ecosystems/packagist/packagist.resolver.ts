import type { EcosystemResolver, RegistryResult, DownloadsResult, BundleResult } from '../../core/ecosystems/ecosystem.interface'
import { fetchPackagistVersions, fetchPackagistMeta } from './packagist-registry.fetcher'

function extractGithubRepo(url: string | undefined): string | null {
  if (!url) return null
  const match = url.match(/github\.com[/:]([^/]+\/[^/.]+)/)
  return match ? match[1]!.replace(/\.git$/, '') : null
}

function buildPhpEngines(require: Record<string, string>): Record<string, string> {
  const engines: Record<string, string> = {}
  if (require.php) engines.php = require.php
  for (const [key, val] of Object.entries(require)) {
    if (key.startsWith('ext-')) engines[key] = val
  }
  return engines
}

function isStableVersion(v: string): boolean {
  return /^\d+\.\d+\.\d+/.test(v.replace(/^v/, '')) && !/dev|alpha|beta|rc/i.test(v)
}

export const packagistResolver: EcosystemResolver = {
  id: 'packagist',

  async fetchRegistry(name: string, version?: string) {
    const [versionsRes, metaRes] = await Promise.all([
      fetchPackagistVersions(name),
      fetchPackagistMeta(name),
    ])

    if (!versionsRes.data) return { data: null, stale: versionsRes.stale }

    const allVersions = versionsRes.data.packages[name] || []
    if (allVersions.length === 0) return { data: null, stale: versionsRes.stale }

    // Select requested version or default to latest
    let latest = allVersions[0]!
    if (version) {
      const match = allVersions.find((v) => {
        const clean = v.version.replace(/^v/, '')
        return clean === version || v.version === version || clean.startsWith(version + '.')
      })
      if (match) latest = match
    }
    const meta = metaRes.data?.package
    const repoUrl = latest.source?.url || meta?.repository

    const stableVersions = allVersions.filter((v) => isStableVersion(v.version))
    const allVersionNames = allVersions.map((v) => ({
      version: v.version,
      date: v.time || null,
    }))
    const stableVersionNames = stableVersions.map((v) => ({
      version: v.version,
      date: v.time || null,
    }))

    // PHP deps: filter out ext-* and php itself
    const deps: Record<string, string> = {}
    for (const [k, v] of Object.entries(latest.require || {})) {
      if (!k.startsWith('ext-') && k !== 'php' && !k.startsWith('lib-')) {
        deps[k] = v
      }
    }

    return {
      data: {
        name: latest.name || name,
        description: latest.description || meta?.description || '',
        latestVersion: latest.version,
        license: latest.license?.[0] || null,
        time: Object.fromEntries(allVersions.map((v) => [v.version, v.time])),
        distTags: { latest: latest.version } as Record<string, string>,
        repository: repoUrl ? { type: 'git', url: repoUrl } : null,
        maintainers: (meta?.maintainers || []).map((m) => m.name),
        latest: {
          dependencies: deps,
          peerDependencies: {},
          hasTypes: false,
          engines: buildPhpEngines(latest.require || {}),
          moduleSystem: 'cjs' as const,
        },
        versions: {
          total: allVersions.length,
          stable: stableVersionNames.slice(0, 25),
          all: allVersionNames.slice(0, 25),
        },
      } as RegistryResult,
      stale: versionsRes.stale,
    }
  },

  async fetchDownloads(name: string) {
    const meta = await fetchPackagistMeta(name)
    if (!meta.data?.package?.downloads) return { data: null, stale: meta.stale }

    const dl = meta.data.package.downloads
    // Packagist gives monthly, estimate weekly as monthly / 4
    const weeklyEstimate = Math.round(dl.monthly / 4)

    return {
      data: { weekly: weeklyEstimate, sparkline: [] } satisfies DownloadsResult,
      stale: meta.stale,
    }
  },

  async fetchBundle() {
    // Bundle size is not applicable for PHP packages
    return { data: null, stale: false }
  },

  installCommand(name: string) {
    return `composer require ${name}`
  },

  registryUrl(name: string) {
    return `https://packagist.org/packages/${name}`
  },
}
