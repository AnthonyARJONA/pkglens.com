import { fetchSafe } from '../../core/fetcher/safe-fetcher'

export interface NpmRegistryData {
  name: string
  description: string
  'dist-tags': Record<string, string>
  versions: Record<string, NpmVersionData>
  time: Record<string, string>
  license: string
  repository: { type: string; url: string } | string
  keywords: string[]
  maintainers: Array<{ name: string; email?: string }>
}

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
  repository: { type: string; url: string } | string
  engines: Record<string, string>
  type: string
  module: string
  exports: unknown
}

export interface NpmDownloads {
  downloads: number
  start: string
  end: string
  package: string
}

export async function fetchNpmRegistry(name: string) {
  return fetchSafe<NpmRegistryData>({
    source: 'npm-registry',
    cacheKey: name,
    url: `https://registry.npmjs.org/${encodeURIComponent(name)}`,
  })
}

export async function fetchNpmDownloads(name: string) {
  return fetchSafe<NpmDownloads>({
    source: 'npm-downloads',
    cacheKey: name,
    url: `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name)}`,
  })
}

export interface NpmDownloadsRange {
  downloads: Array<{ downloads: number; day: string }>
  start: string
  end: string
  package: string
}

export async function fetchNpmDownloadsRange(name: string) {
  return fetchSafe<NpmDownloadsRange>({
    source: 'npm-downloads',
    cacheKey: `${name}:range`,
    url: `https://api.npmjs.org/downloads/range/last-year/${encodeURIComponent(name)}`,
  })
}
