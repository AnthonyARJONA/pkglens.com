import { fetchNpmRegistry } from '../../ecosystems/npm/npm-registry.fetcher'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required' })
  }

  const decodedName = decodeURIComponent(name)

  const registry = await fetchNpmRegistry(decodedName)
  if (!registry.data) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  const reg = registry.data
  const latestVersion = reg['dist-tags']?.latest || ''
  const maintainerCount = (reg.maintainers || []).length
  const versionCount = Object.keys(reg.versions || {}).length
  const lastPublish = reg.time?.[latestVersion]
  const daysSinceRelease = lastPublish ? (Date.now() - new Date(lastPublish).getTime()) / 86400000 : 999

  let score = 60
  if (maintainerCount >= 3) score += 10
  else if (maintainerCount === 1) score -= 5
  if (versionCount > 100) score += 15
  else if (versionCount > 20) score += 10
  if (daysSinceRelease < 90) score += 15
  else if (daysSinceRelease > 365) score -= 10
  score = Math.min(100, Math.max(10, score))

  const valueColor = score >= 80 ? '#4c1' : score >= 60 ? '#dfb317' : '#e05d44'
  const valueText = String(score)
  const labelWidth = 54
  const valueWidth = 36
  const totalWidth = labelWidth + valueWidth

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" viewBox="0 0 ${totalWidth} 20">
  <linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <clipPath id="r"><rect width="${totalWidth}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${valueColor}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">pkglens</text>
    <text x="${labelWidth / 2}" y="14">pkglens</text>
    <text x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${valueText}</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${valueText}</text>
  </g>
</svg>`

  setResponseHeaders(event, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  })

  return svg
})
