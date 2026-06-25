import type { D1Database } from '@cloudflare/workers-types'

let _db: D1Database | null = null

export function setD1(db: D1Database): void {
  _db = db
}

export function getD1(): D1Database {
  if (!_db) throw new Error('D1 binding "DB" not initialised — server/plugins/cloudflare-bindings.ts must run on each request')
  return _db
}
