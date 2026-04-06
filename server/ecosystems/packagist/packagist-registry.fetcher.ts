import { fetchSafe } from '../../core/fetcher/safe-fetcher'

export interface PackagistVersionData {
  name: string
  description: string
  version: string
  version_normalized: string
  license: string[]
  authors: Array<{ name: string; email?: string }>
  source: { url: string; type: string; reference: string }
  require: Record<string, string>
  time: string
  type: string
}

interface PackagistP2Response {
  packages: Record<string, PackagistVersionData[]>
}

export interface PackagistMetaResponse {
  package: {
    name: string
    description: string
    repository: string
    downloads: { total: number; monthly: number; daily: number }
    favers: number
    maintainers: Array<{ name: string }>
  }
}

export async function fetchPackagistVersions(name: string) {
  return fetchSafe<PackagistP2Response>({
    source: 'packagist-registry',
    cacheKey: name,
    url: `https://repo.packagist.org/p2/${name}.json`,
  })
}

export async function fetchPackagistMeta(name: string) {
  return fetchSafe<PackagistMetaResponse>({
    source: 'packagist-meta',
    cacheKey: name,
    url: `https://packagist.org/packages/${name}.json`,
  })
}
