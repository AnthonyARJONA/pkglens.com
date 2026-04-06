import { getDb } from '../../database/sqlite'

interface CacheEntry<T> {
  data: T
  fetchedAt: number
  stale: boolean
}

const TTL: Record<string, number> = {
  'npm-registry': 60 * 60 * 1000,       // 1h
  'npm-downloads': 6 * 60 * 60 * 1000,  // 6h
  'bundlephobia': 24 * 60 * 60 * 1000,  // 24h
  'osv-vulns': 60 * 60 * 1000,          // 1h
  'github-repo': 6 * 60 * 60 * 1000,    // 6h
  'github-releases': 12 * 60 * 60 * 1000, // 12h
  'packagist-registry': 60 * 60 * 1000,  // 1h
  'packagist-meta': 6 * 60 * 60 * 1000,  // 6h
}

const STALE_TTL = 24 * 60 * 60 * 1000

export async function cachedFetch<T>(
  source: string, key: string, fetcher: () => Promise<T>,
): Promise<CacheEntry<T>> {
  const db = getDb()
  const cacheKey = `${source}:${key}`
  const now = Date.now()
  const row = db.prepare('SELECT data, fetched_at, expires_at FROM cache WHERE key = ?').get(cacheKey) as
    | { data: string; fetched_at: number; expires_at: number }
    | undefined

  if (row) {
    let parsed: T
    try {
      parsed = JSON.parse(row.data)
    } catch {
      db.prepare('DELETE FROM cache WHERE key = ?').run(cacheKey)
      // Fall through to fresh fetch
      return fetchAndCache(source, cacheKey, fetcher, now)
    }

    const isExpired = now > row.expires_at
    const isStale = now > row.expires_at + STALE_TTL

    if (!isExpired) {
      return { data: parsed, fetchedAt: row.fetched_at, stale: false }
    }

    if (!isStale) {
      revalidate(source, cacheKey, fetcher).catch(() => {})
      return { data: parsed, fetchedAt: row.fetched_at, stale: true }
    }
  }

  return fetchAndCache(source, cacheKey, fetcher, now, row)
}

async function fetchAndCache<T>(
  source: string, cacheKey: string, fetcher: () => Promise<T>,
  now: number, staleRow?: { data: string; fetched_at: number },
): Promise<CacheEntry<T>> {
  try {
    const data = await fetcher()
    const expiresAt = now + (TTL[source] || 60 * 60 * 1000)
    getDb().prepare('INSERT OR REPLACE INTO cache (key, data, fetched_at, expires_at) VALUES (?, ?, ?, ?)')
      .run(cacheKey, JSON.stringify(data), now, expiresAt)
    return { data, fetchedAt: now, stale: false }
  } catch (err) {
    if (staleRow) {
      try {
        return { data: JSON.parse(staleRow.data), fetchedAt: staleRow.fetched_at, stale: true }
      } catch {
        getDb().prepare('DELETE FROM cache WHERE key = ?').run(cacheKey)
      }
    }
    throw err
  }
}

async function revalidate<T>(source: string, cacheKey: string, fetcher: () => Promise<T>): Promise<void> {
  try {
    const data = await fetcher()
    const now = Date.now()
    const expiresAt = now + (TTL[source] || 60 * 60 * 1000)
    getDb().prepare('INSERT OR REPLACE INTO cache (key, data, fetched_at, expires_at) VALUES (?, ?, ?, ?)')
      .run(cacheKey, JSON.stringify(data), now, expiresAt)
  } catch { /* stale data continues to be served */ }
}

export function cleanupCache(): void {
  const cutoff = Date.now() - STALE_TTL
  getDb().prepare('DELETE FROM cache WHERE expires_at < ?').run(cutoff)
}
