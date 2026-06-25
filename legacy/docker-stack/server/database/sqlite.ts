import Database from 'better-sqlite3'
import { join } from 'path'

const DB_PATH = join(process.cwd(), '.data', 'db', 'pkglens.db')

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('synchronous = NORMAL')

    db.exec(`
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        fetched_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL
      )
    `)

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_cache_expires
      ON cache (expires_at)
    `)
  }

  return db
}
