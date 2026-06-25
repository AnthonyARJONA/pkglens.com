import type { EcosystemResolver, RegistryResult, DownloadsResult, BundleResult } from '../../core/ecosystems/ecosystem.interface'
import { fetchNpmRegistry, fetchNpmRegistryVersion, fetchNpmDownloads, fetchNpmDownloadsRange } from './npm-registry.fetcher'
import type { NpmVersionData } from './npm-registry.fetcher'
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
    let latestVersion = reg['dist-tags']?.latest || reg.versionsList[reg.versionsList.length - 1] || ''
    let latestData: NpmVersionData | undefined = reg.versions?.[latestVersion]

    if (version) {
      const match = reg.versionsList.findLast((v) => {
        const clean = v.replace(/^v/, '')
        return clean === version || v === version || clean.startsWith(version + '.')
      })
      if (match && match !== latestVersion) {
        const specific = await fetchNpmRegistryVersion(name, match)
        if (specific.data) {
          latestVersion = match
          latestData = specific.data
        }
      }
    }

    return {
      data: {
        name: reg.name,
        description: reg.description || latestData?.description || '',
        latestVersion,
        license: latestData?.license || reg.license || null,
        lastPublishDate: reg.time?.[latestVersion] || null,
        distTags: reg['dist-tags'] || {},
        repository: latestData?.repository || reg.repository || null,
        maintainers: reg.maintainers.map((m) => m.name),
        latest: latestData ? {
          dependencies: latestData.dependencies || {},
          peerDependencies: latestData.peerDependencies || {},
          hasTypes: !!(latestData.types || latestData.typings),
          engines: latestData.engines || {},
          moduleSystem: detectModuleSystem(latestData),
        } : null,
        versions: buildVersionSummary({ versionsList: reg.versionsList, time: reg.time }),
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
