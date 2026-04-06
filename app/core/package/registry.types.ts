export interface RegistryData {
  name: string
  description: string
  latestVersion: string
  license: string | null
  lastPublishDate: string | null
  distTags: Record<string, string>
  repository: { type: string; url: string } | string | null
  installCommand?: string
  versions: {
    total: number
    stable: readonly VersionEntry[]
    all: readonly VersionEntry[]
  }
  maintainers: readonly string[]
  latest: {
    dependencies: Record<string, string>
    peerDependencies: Record<string, string>
    hasTypes: boolean
    engines: Record<string, string>
    moduleSystem: 'esm' | 'cjs' | 'dual'
  } | null
}

export interface VersionEntry {
  version: string
  date: string | null
}
