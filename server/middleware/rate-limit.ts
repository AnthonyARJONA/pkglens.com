const WINDOW_MS = 60_000
const MAX_REQUESTS = 30
const CLEANUP_INTERVAL = 60_000

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Periodically clean expired entries
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key)
    }
  }
}, CLEANUP_INTERVAL)

export default defineEventHandler((event) => {
  const ip = getRequestIP(event)
  if (!ip) {
    throw createError({ statusCode: 400, statusMessage: 'Unable to identify client' })
  }
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) {
    setResponseHeader(event, 'Retry-After', Math.ceil((entry.resetAt - now) / 1000))
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' })
  }
})
