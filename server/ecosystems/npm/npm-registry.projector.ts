export interface NpmVersionData {
  name: string
  version: string
  description: string
  license: string
  dependencies: Record<string, string>
  peerDependencies: Record<string, string>
  devDependencies: Record<string, string>
  keywords: string[]
  types: string
  typings: string
  repository: { type: string; url: string } | string | null
  engines: Record<string, string>
  type: string
  module: string
  exports: unknown
  dist: { unpackedSize?: number }
}

export interface NpmRegistryData {
  name: string
  description: string
  'dist-tags': Record<string, string>
  versions: Record<string, NpmVersionData>
  versionsList: string[]
  time: Record<string, string>
  license: string
  repository: { type: string; url: string } | string | null
  maintainers: Array<{ name: string }>
}

type RawVersion = Partial<NpmVersionData>
type RawRegistry = Partial<NpmRegistryData>

export function projectVersion(rawUnknown: unknown): NpmVersionData {
  const v = (rawUnknown || {}) as RawVersion
  return {
    name: v.name || '',
    version: v.version || '',
    description: v.description || '',
    license: v.license || '',
    dependencies: v.dependencies || {},
    peerDependencies: v.peerDependencies || {},
    devDependencies: v.devDependencies || {},
    keywords: v.keywords || [],
    types: v.types || '',
    typings: v.typings || '',
    repository: v.repository ?? null,
    engines: v.engines || {},
    type: v.type || '',
    module: v.module || '',
    exports: v.exports ?? null,
    dist: { unpackedSize: v.dist?.unpackedSize },
  }
}

export function projectNpmRegistry(rawUnknown: unknown): NpmRegistryData {
  const raw = (rawUnknown || {}) as RawRegistry
  const distTags = raw['dist-tags'] || {}
  const versionsList = Object.keys(raw.versions || {})
  const latestVersion = distTags.latest || versionsList[versionsList.length - 1] || ''
  const latestData = raw.versions?.[latestVersion]

  return {
    name: raw.name || '',
    description: raw.description || latestData?.description || '',
    'dist-tags': distTags,
    versions: latestData ? { [latestVersion]: projectVersion(latestData) } : {},
    versionsList,
    time: raw.time || {},
    license: raw.license || '',
    repository: raw.repository ?? latestData?.repository ?? null,
    maintainers: (raw.maintainers || []).map((m) => ({ name: m.name })),
  }
}
