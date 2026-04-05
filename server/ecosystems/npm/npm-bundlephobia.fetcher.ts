import { fetchSafe } from '../../core/fetcher/safe-fetcher'

export interface BundleData {
  size: number
  gzip: number
  dependencySizes: Array<{ name: string; approximateSize: number }>
  installSize?: number
  installTime?: number
}

export async function fetchBundleSize(name: string) {
  return fetchSafe<BundleData>({
    source: 'bundlephobia',
    cacheKey: name,
    url: `https://bundlephobia.com/api/size?package=${encodeURIComponent(name)}`,
  })
}
