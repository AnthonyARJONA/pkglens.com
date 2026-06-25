import { fetchSafe } from '../../core/fetcher/safe-fetcher'
import { projectNpmRegistry, projectVersion } from './npm-registry.projector'
import type { NpmRegistryData, NpmVersionData } from './npm-registry.projector'

export type { NpmRegistryData, NpmVersionData }

export interface NpmDownloads {
  downloads: number
  start: string
  end: string
  package: string
}

export interface NpmDownloadsRange {
  downloads: Array<{ downloads: number; day: string }>
  start: string
  end: string
  package: string
}

export async function fetchNpmRegistry(name: string) {
  return fetchSafe<NpmRegistryData>({
    source: 'npm-registry',
    cacheKey: name,
    url: `https://registry.npmjs.org/${encodeURIComponent(name)}`,
    transform: projectNpmRegistry,
  })
}

export async function fetchNpmRegistryVersion(name: string, version: string) {
  return fetchSafe<NpmVersionData>({
    source: 'npm-registry',
    cacheKey: `${name}@${version}`,
    url: `https://registry.npmjs.org/${encodeURIComponent(name)}/${encodeURIComponent(version)}`,
    transform: projectVersion,
  })
}

export async function fetchNpmDownloads(name: string) {
  return fetchSafe<NpmDownloads>({
    source: 'npm-downloads',
    cacheKey: name,
    url: `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name)}`,
  })
}

export async function fetchNpmDownloadsRange(name: string) {
  return fetchSafe<NpmDownloadsRange>({
    source: 'npm-downloads',
    cacheKey: `${name}:range`,
    url: `https://api.npmjs.org/downloads/range/last-year/${encodeURIComponent(name)}`,
  })
}
