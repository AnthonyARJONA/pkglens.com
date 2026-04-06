import { fetchSafe } from '../../core/fetcher/safe-fetcher'

interface NpmSearchResponse {
  objects: Array<{ package: { name: string; description: string; version: string } }>
}

interface PackagistSearchResponse {
  results: Array<{ name: string; description: string; url: string }>
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = String(query.q || '').trim()
  const size = Math.min(Number(query.size) || 5, 10)
  const ecosystem = String(query.ecosystem || 'npm')

  if (q.length < 2 || q.length > 100) return { results: [] }

  if (!['npm', 'packagist'].includes(ecosystem)) return { results: [] }

  if (ecosystem === 'packagist') {
    return searchPackagist(q, size)
  }

  return searchNpm(q, size)
})

async function searchNpm(q: string, size: number) {
  const result = await fetchSafe<NpmSearchResponse>({
    source: 'npm-registry',
    cacheKey: `search:${q}:${size}`,
    url: `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=${size}`,
  })

  return {
    results: (result.data?.objects || []).map((o) => ({
      name: o.package.name,
      description: (o.package.description || '').slice(0, 80),
      version: o.package.version,
    })),
  }
}

async function searchPackagist(q: string, size: number) {
  const result = await fetchSafe<PackagistSearchResponse>({
    source: 'packagist-meta',
    cacheKey: `search:${q}:${size}`,
    url: `https://packagist.org/search.json?q=${encodeURIComponent(q)}&per_page=${size}`,
  })

  return {
    results: (result.data?.results || []).map((r) => ({
      name: r.name,
      description: (r.description || '').slice(0, 80),
      version: '',
    })),
  }
}
