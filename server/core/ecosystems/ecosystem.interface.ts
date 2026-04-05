export type EcosystemId = 'npm' | 'pypi' | 'cargo' | 'packagist' | 'go'

export interface RegistryResult {
  name: string
  description: string
  latestVersion: string
  license: string | null
  time: Record<string, string>
  distTags: Record<string, string>
  repository: { type: string; url: string } | string | null
  maintainers: string[]
  latest: {
    dependencies: Record<string, string>
    peerDependencies: Record<string, string>
    hasTypes: boolean
    engines: Record<string, string>
    moduleSystem: 'esm' | 'cjs' | 'dual'
  } | null
  versions: {
    total: number
    stable: Array<{ version: string; date: string | null }>
    all: Array<{ version: string; date: string | null }>
  }
}

export interface DownloadsResult {
  weekly: number
  sparkline: number[]
}

export interface BundleResult {
  size: number
  gzip: number
  dependencySizes: Array<{ name: string; approximateSize: number }>
  installSize: number | null
  installTime: number | null
}

export interface EcosystemResolver {
  id: EcosystemId
  fetchRegistry(name: string): Promise<{ data: RegistryResult | null; stale: boolean }>
  fetchDownloads(name: string): Promise<{ data: DownloadsResult | null; stale: boolean }>
  fetchBundle(name: string): Promise<{ data: BundleResult | null; stale: boolean }>
  installCommand(name: string): string
  registryUrl(name: string): string
}
