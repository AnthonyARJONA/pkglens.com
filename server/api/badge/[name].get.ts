import type { EcosystemId } from '../../core/ecosystems/ecosystem.interface'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) throw createError({ statusCode: 400, statusMessage: 'Package name is required' })

  const query = getQuery(event)
  const ecosystem = (query.ecosystem as EcosystemId) || 'npm'

  // Fetch from our own API — scores are computed server-side, single source of truth
  const data: any = await $fetch('/api/pkg', {
    query: { name: decodeURIComponent(name), ecosystem },
  }).catch(() => null)

  if (!data?.scores) throw createError({ statusCode: 404, statusMessage: 'Package not found' })

  setResponseHeaders(event, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    'Access-Control-Allow-Origin': '*',
  })

  return renderBadgeSvg(data.scores.overall)
})

function renderBadgeSvg(score: number): string {
  const valueColor = score >= 80 ? '#4c1' : score >= 60 ? '#dfb317' : '#e05d44'
  const lw = 54, vw = 36, tw = lw + vw
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="20" viewBox="0 0 ${tw} 20">
  <linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <clipPath id="r"><rect width="${tw}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)"><rect width="${lw}" height="20" fill="#555"/><rect x="${lw}" width="${vw}" height="20" fill="${valueColor}"/><rect width="${tw}" height="20" fill="url(#s)"/></g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text x="${lw / 2}" y="15" fill="#010101" fill-opacity=".3">pkglens</text><text x="${lw / 2}" y="14">pkglens</text>
    <text x="${lw + vw / 2}" y="15" fill="#010101" fill-opacity=".3">${score}</text><text x="${lw + vw / 2}" y="14">${score}</text>
  </g></svg>`
}
