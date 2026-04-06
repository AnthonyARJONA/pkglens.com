import { cleanupCache } from '../core/cache/cache.service'
import { getDb } from '../database/sqlite'

const CLEANUP_INTERVAL = 60 * 60 * 1000 // 1 hour
const MAX_ROWS = 50_000

function runCleanup(): void {
  try {
    cleanupCache()

    const db = getDb()
    db.transaction(() => {
      const row = db.prepare('SELECT COUNT(*) as cnt FROM cache').get() as { cnt: number }

      if (row.cnt > MAX_ROWS) {
        const excess = row.cnt - MAX_ROWS
        db.prepare(
          'DELETE FROM cache WHERE key IN (SELECT key FROM cache ORDER BY fetched_at ASC LIMIT ?)',
        ).run(excess)
      }
    })()
  }
  catch {
    // Cleanup failure is non-critical
  }
}

export default defineNitroPlugin(() => {
  const timer = setInterval(runCleanup, CLEANUP_INTERVAL)

  // Run initial cleanup after short delay
  setTimeout(runCleanup, 10_000)

  // Cleanup on shutdown
  if (typeof globalThis !== 'undefined') {
    const cleanup = () => clearInterval(timer)
    process.on('SIGTERM', cleanup)
    process.on('SIGINT', cleanup)
  }
})
