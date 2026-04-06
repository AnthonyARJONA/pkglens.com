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
  const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=${size}`
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) return { results: [] }
  const data = (await res.json()) as NpmSearchResponse

  return {
    results: (data?.objects || []).map((o) => ({
      name: o.package.name,
      description: (o.package.description || '').slice(0, 80),
      version: o.package.version,
    })),
  }
}

async function searchPackagist(q: string, size: number) {
  const url = `https://packagist.org/search.json?q=${encodeURIComponent(q)}&per_page=${size}`
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) return { results: [] }
  const data = (await res.json()) as PackagistSearchResponse

  return {
    results: (data?.results || []).map((r) => ({
      name: r.name,
      description: (r.description || '').slice(0, 80),
      version: '',
    })),
  }
}
