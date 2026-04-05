import { fetchSafe } from '../../core/fetcher/safe-fetcher'

interface NpmSearchResponse {
  objects: Array<{
    package: { name: string; description: string; version: string }
  }>
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = String(query.q || '').trim()
  const size = Math.min(Number(query.size) || 5, 10)

  if (q.length < 2) return { results: [] }

  const result = await fetchSafe<NpmSearchResponse>({
    source: 'npm-registry',
    cacheKey: `search:${q}:${size}`,
    url: `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=${size}`,
  })

  const objects = result.data?.objects || []

  return {
    results: objects.map((o) => ({
      name: o.package.name,
      description: (o.package.description || '').slice(0, 80),
      version: o.package.version,
    })),
  }
})
