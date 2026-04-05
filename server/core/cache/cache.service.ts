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
}

const STALE_TTL = 24 * 60 * 60 * 1000 // 24h stale-while-revalidate

export async function cachedFetch<T>(
  source: string,
  key: string,
  fetcher: () => Promise<T>,
): Promise<CacheEntry<T>> {
  const db = getDb()
  const cacheKey = `${source}:${key}`
  const now = Date.now()

  // Check cache
  const row = db.prepare('SELECT data, fetched_at, expires_at FROM cache WHERE key = ?').get(cacheKey) as
    | { data: string; fetched_at: number; expires_at: number }
    | undefined

  if (row) {
    const isExpired = now > row.expires_at
    const isStale = now > row.expires_at + STALE_TTL

    if (!isExpired) {
      return { data: JSON.parse(row.data), fetchedAt: row.fetched_at, stale: false }
    }

    // Expired but within stale window → serve stale + revalidate in background
    if (!isStale) {
      // Fire and forget revalidation
      revalidate(source, cacheKey, fetcher).catch(() => {})
      return { data: JSON.parse(row.data), fetchedAt: row.fetched_at, stale: true }
    }
  }

  // No cache or fully stale → fetch fresh
  try {
    const data = await fetcher()
    const ttl = TTL[source] || 60 * 60 * 1000
    const expiresAt = now + ttl

    db.prepare(
      'INSERT OR REPLACE INTO cache (key, data, fetched_at, expires_at) VALUES (?, ?, ?, ?)',
    ).run(cacheKey, JSON.stringify(data), now, expiresAt)

    return { data, fetchedAt: now, stale: false }
  } catch (err) {
    // If fetch fails and we have stale data, return it
    if (row) {
      return { data: JSON.parse(row.data), fetchedAt: row.fetched_at, stale: true }
    }
    throw err
  }
}

async function revalidate<T>(
  source: string,
  cacheKey: string,
  fetcher: () => Promise<T>,
): Promise<void> {
  try {
    const data = await fetcher()
    const now = Date.now()
    const ttl = TTL[source] || 60 * 60 * 1000
    const expiresAt = now + ttl

    getDb()
      .prepare('INSERT OR REPLACE INTO cache (key, data, fetched_at, expires_at) VALUES (?, ?, ?, ?)')
      .run(cacheKey, JSON.stringify(data), now, expiresAt)
  } catch {
    // Revalidation failed silently — stale data continues to be served
  }
}

// Cleanup expired entries (call periodically)
export function cleanupCache(): void {
  const cutoff = Date.now() - STALE_TTL
  getDb().prepare('DELETE FROM cache WHERE expires_at < ?').run(cutoff)
}
