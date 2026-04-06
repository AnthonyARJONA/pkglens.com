import type { EcosystemResolver, RegistryResult, DownloadsResult, BundleResult } from '../../core/ecosystems/ecosystem.interface'
import { fetchNpmRegistry, fetchNpmDownloads, fetchNpmDownloadsRange } from './npm-registry.fetcher'
import { fetchBundleSize } from './npm-bundlephobia.fetcher'
import { detectModuleSystem } from './module-system.detector'
import { buildSparkline } from './sparkline.builder'
import { buildVersionSummary } from './version-summary.builder'

export const npmResolver: EcosystemResolver = {
  id: 'npm',

  async fetchRegistry(name: string, version?: string) {
    const result = await fetchNpmRegistry(name)
    if (!result.data) return { data: null, stale: result.stale }

    const reg = result.data
    let latestVersion = reg['dist-tags']?.latest || Object.keys(reg.versions || {}).pop() || ''

    if (version) {
      const allKeys = Object.keys(reg.versions || {}).reverse()
      const match = allKeys.find((v) => {
        const clean = v.replace(/^v/, '')
        return clean === version || v === version || clean.startsWith(version + '.')
      })
      if (match) latestVersion = match
    }

    const latestData = reg.versions?.[latestVersion]

    return {
      data: {
        name: reg.name,
        description: reg.description || latestData?.description || '',
        latestVersion,
        license: latestData?.license || reg.license || null,
        lastPublishDate: reg.time?.[latestVersion] || null,
        distTags: reg['dist-tags'] || {},
        repository: latestData?.repository || reg.repository || null,
        maintainers: (reg.maintainers || []).map((m) => m.name),
        latest: latestData ? {
          dependencies: latestData.dependencies || {},
          peerDependencies: latestData.peerDependencies || {},
          hasTypes: !!(latestData.types || latestData.typings),
          engines: latestData.engines || {},
          moduleSystem: detectModuleSystem(latestData),
        } : null,
        versions: buildVersionSummary(reg),
      } satisfies RegistryResult,
      stale: result.stale,
    }
  },

  async fetchDownloads(name: string) {
    const [point, range] = await Promise.all([
      fetchNpmDownloads(name),
      fetchNpmDownloadsRange(name),
    ])
    if (!point.data) return { data: null, stale: point.stale }

    return {
      data: { weekly: point.data.downloads, sparkline: buildSparkline(range.data) } satisfies DownloadsResult,
      stale: point.stale || range.stale,
    }
  },

  async fetchBundle(name: string) {
    const result = await fetchBundleSize(name)
    if (!result.data) return { data: null, stale: result.stale }

    return {
      data: {
        size: result.data.size,
        gzip: result.data.gzip,
        dependencySizes: result.data.dependencySizes || [],
        installSize: result.data.installSize || null,
        installTime: result.data.installTime || null,
      } satisfies BundleResult,
      stale: result.stale,
    }
  },

  installCommand(name: string) {
    return `npm install ${name}`
  },

  registryUrl(name: string) {
    return `https://www.npmjs.com/package/${name}`
  },
}
