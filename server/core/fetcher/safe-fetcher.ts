import { isCircuitOpen, recordFailure, recordSuccess } from '../cache/circuit-breaker'
import { cachedFetch } from '../cache/cache.service'

interface FetchOptions {
  source: string
  cacheKey: string
  url: string
  method?: 'GET' | 'POST'
  body?: unknown
  headers?: Record<string, string>
  fallback?: unknown
}

export async function fetchSafe<T>(options: FetchOptions): Promise<{ data: T | null; stale: boolean }> {
  const { source, cacheKey, url, method = 'GET', body, headers = {}, fallback = null } = options

  if (isCircuitOpen(source)) {
    // Try cache even if circuit is open
    try {
      const cached = await cachedFetch<T>(source, cacheKey, async () => {
        throw new Error('circuit open')
      })
      return { data: cached.data, stale: cached.stale }
    } catch {
      return { data: fallback as T | null, stale: true }
    }
  }

  try {
    const result = await cachedFetch<T>(source, cacheKey, async () => {
      const fetchOptions: RequestInit = {
        method,
        headers: { 'Accept': 'application/json', ...headers },
      }
      if (body) {
        fetchOptions.body = JSON.stringify(body)
        fetchOptions.headers = { ...fetchOptions.headers as Record<string, string>, 'Content-Type': 'application/json' }
      }

      const res = await fetch(url, fetchOptions)
      if (!res.ok) {
        throw new Error(`${source} responded with ${res.status}`)
      }
      return res.json()
    })

    recordSuccess(source)
    return { data: result.data, stale: result.stale }
  } catch {
    recordFailure(source)
    return { data: fallback as T | null, stale: true }
  }
}
