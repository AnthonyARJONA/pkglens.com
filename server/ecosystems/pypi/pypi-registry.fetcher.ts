import { fetchSafe } from '../../core/fetcher/safe-fetcher'

export interface PypiRegistryData {
  info: {
    name: string
    summary: string
    version: string
    license: string | null
    requires_dist: string[] | null
    author: string | null
    maintainer: string | null
    project_urls: Record<string, string> | null
    requires_python: string | null
    classifiers: string[]
  }
  releases: Record<string, Array<{ upload_time_iso_8601: string; filename: string }>>
}

export interface PypiDownloadsData {
  data: { last_week: number }
}

export async function fetchPypiRegistry(name: string) {
  return fetchSafe<PypiRegistryData>({
    source: 'pypi-registry',
    cacheKey: name,
    url: `https://pypi.org/pypi/${encodeURIComponent(name)}/json`,
  })
}

export async function fetchPypiDownloads(name: string) {
  return fetchSafe<PypiDownloadsData>({
    source: 'pypi-downloads',
    cacheKey: name,
    url: `https://pypistats.org/api/packages/${encodeURIComponent(name)}/recent`,
  })
}
