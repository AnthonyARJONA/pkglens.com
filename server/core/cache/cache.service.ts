import { getD1 } from '../../database/d1'

interface CacheEntry<T> {
  data: T
  fetchedAt: number
  stale: boolean
}

interface CacheRow {
  data: string
  fetched_at: number
  expires_at: number
}

const TTL: Record<string, number> = {
  'npm-registry': 60 * 60 * 1000,        // 1h
  'npm-downloads': 6 * 60 * 60 * 1000,   // 6h
  'bundlephobia': 24 * 60 * 60 * 1000,   // 24h
  'osv-vulns': 60 * 60 * 1000,           // 1h
  'github-repo': 6 * 60 * 60 * 1000,     // 6h
  'github-releases': 12 * 60 * 60 * 1000, // 12h
  'packagist-registry': 60 * 60 * 1000,   // 1h
  'packagist-meta': 6 * 60 * 60 * 1000,   // 6h
  'pypi-registry': 60 * 60 * 1000,        // 1h
  'pypi-downloads': 6 * 60 * 60 * 1000,   // 6h
}

const STALE_TTL = 24 * 60 * 60 * 1000
const LAZY_CLEANUP_PROBABILITY = 0.01

export async function cachedFetch<T>(
  source: string, key: string, fetcher: () => Promise<T>,
): Promise<CacheEntry<T>> {
  const db = getD1()
  const cacheKey = `${source}:${key}`
  const now = Date.now()

  triggerLazyCleanup(now)

  const row = await db
    .prepare('SELECT data, fetched_at, expires_at FROM cache WHERE key = ?')
    .bind(cacheKey)
    .first<CacheRow>()

  if (row) {
    let parsed: T
    try {
      parsed = JSON.parse(row.data)
    }
    catch {
      await db.prepare('DELETE FROM cache WHERE key = ?').bind(cacheKey).run()
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

  return fetchAndCache(source, cacheKey, fetcher, now, row ?? undefined)
}

async function fetchAndCache<T>(
  source: string, cacheKey: string, fetcher: () => Promise<T>,
  now: number, staleRow?: CacheRow,
): Promise<CacheEntry<T>> {
  try {
    const data = await fetcher()
    const expiresAt = now + (TTL[source] || 60 * 60 * 1000)
    await getD1()
      .prepare('INSERT OR REPLACE INTO cache (key, data, fetched_at, expires_at) VALUES (?, ?, ?, ?)')
      .bind(cacheKey, JSON.stringify(data), now, expiresAt)
      .run()
    return { data, fetchedAt: now, stale: false }
  }
  catch (err) {
    if (staleRow) {
      try {
        return { data: JSON.parse(staleRow.data), fetchedAt: staleRow.fetched_at, stale: true }
      }
      catch {
        await getD1().prepare('DELETE FROM cache WHERE key = ?').bind(cacheKey).run()
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
    await getD1()
      .prepare('INSERT OR REPLACE INTO cache (key, data, fetched_at, expires_at) VALUES (?, ?, ?, ?)')
      .bind(cacheKey, JSON.stringify(data), now, expiresAt)
      .run()
  }
  catch { /* stale data continues to be served */ }
}

function triggerLazyCleanup(now: number): void {
  if (Math.random() > LAZY_CLEANUP_PROBABILITY) return
  const cutoff = now - STALE_TTL
  getD1()
    .prepare('DELETE FROM cache WHERE expires_at < ?')
    .bind(cutoff)
    .run()
    .catch(() => {})
}
