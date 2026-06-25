import { isCircuitOpen, recordFailure, recordSuccess } from '../cache/circuit-breaker'
import { cachedFetch } from '../cache/cache.service'

interface FetchOptions<T> {
  source: string
  cacheKey: string
  url: string
  method?: 'GET' | 'POST'
  body?: unknown
  headers?: Record<string, string>
  fallback?: T | null
  transform?: (raw: unknown) => T
}

export async function fetchSafe<T>(options: FetchOptions<T>): Promise<{ data: T | null; stale: boolean }> {
  const { source, cacheKey, url, method = 'GET', body, headers = {}, fallback = null, transform } = options

  if (isCircuitOpen(source)) {
    try {
      const cached = await cachedFetch<T>(source, cacheKey, async () => {
        throw new Error('circuit open')
      })
      return { data: cached.data, stale: cached.stale }
    }
    catch {
      return { data: fallback, stale: true }
    }
  }

  try {
    const result = await cachedFetch<T>(source, cacheKey, async () => {
      const fetchOptions: RequestInit = {
        method,
        headers: { 'Accept': 'application/json', ...headers },
        signal: AbortSignal.timeout(10_000),
      }
      if (body) {
        fetchOptions.body = JSON.stringify(body)
        fetchOptions.headers = { ...fetchOptions.headers as Record<string, string>, 'Content-Type': 'application/json' }
      }

      const res = await fetch(url, fetchOptions)
      if (!res.ok) throw new Error(`${source} responded with ${res.status}`)
      const raw = await res.json()
      return transform ? transform(raw) : (raw as T)
    })

    recordSuccess(source)
    return { data: result.data, stale: result.stale }
  }
  catch (err) {
    console.error(`[fetchSafe] ${source} failed for ${cacheKey}:`, err instanceof Error ? err.message : err)
    recordFailure(source)
    return { data: fallback, stale: true }
  }
}
