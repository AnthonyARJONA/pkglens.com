/**
 * Server-side scoring — single source of truth.
 * Frontend reads scores.overall from API response.
 * Badge reads scores.overall from API response.
 * No duplication.
 */

const WEIGHTS = { security: 0.4, quality: 0.3, popularity: 0.3 }
const SEV: Record<string, number> = { critical: 25, high: 15, medium: 8, low: 4 }
const MS_PER_DAY = 86_400_000

export function computeServerScores(data: {
  vulnerabilities: Array<{ database_specific?: { severity?: string } }>
  depsVulnerabilities: Array<{ vulnCount: number }>
  registry: {
    maintainers: string[]
    lastPublishDate: string | null
    versions: { total: number }
    latest: { dependencies: Record<string, string>; moduleSystem?: string; hasTypes?: boolean } | null
  }
  downloads: { weekly: number } | null
  bundle: { gzip?: number; size?: number } | null
  github: { stars: number } | null
  meta: { ecosystem?: string }
}): { security: number; quality: number; popularity: number; overall: number } {
  const reg = data.registry
  const days = reg.lastPublishDate ? (Date.now() - new Date(reg.lastPublishDate).getTime()) / MS_PER_DAY : 999
  const maintainers = reg.maintainers.length
  const depCount = Object.keys(reg.latest?.dependencies || {}).length
  const isJs = (data.meta.ecosystem || 'npm') === 'npm'

  // Security (100 down)
  let sec = 100
  for (const v of data.vulnerabilities) {
    sec -= SEV[(v.database_specific?.severity || 'low').toLowerCase()] ?? 4
  }
  if (data.depsVulnerabilities.length > 0) {
    sec -= Math.min(20, data.depsVulnerabilities.reduce((s, d) => s + d.vulnCount, 0) * 3)
  }
  if (maintainers === 1) sec -= 10
  if (days > 365) sec -= 10
  sec = clamp(sec)

  // Quality (100 down)
  let qual = 100
  if (isJs && data.bundle) {
    const gz = data.bundle.gzip || data.bundle.size || 0
    if (gz >= 150_000) qual -= 40
    else if (gz >= 50_000) qual -= 25
    else if (gz >= 20_000) qual -= 15
    else if (gz >= 5_000) qual -= 5
  } else if (isJs && !data.bundle) {
    qual -= 10
  }
  if (isJs && reg.latest?.moduleSystem === 'cjs') qual -= 10
  if (depCount === 0) { /* perfect */ }
  else if (depCount <= 5) qual -= 5
  else if (depCount <= 15) qual -= 10
  else qual -= 20
  qual = clamp(qual)

  // Popularity (0 up)
  let pop = 0
  const w = data.downloads?.weekly || 0
  if (w > 10e6) pop += 30
  else if (w > 1e6) pop += 25
  else if (w > 100e3) pop += 20
  else if (w > 10e3) pop += 15
  else if (w > 0) pop += 5

  const stars = data.github?.stars || 0
  if (stars > 50000) pop += 20
  else if (stars > 10000) pop += 15
  else if (stars > 1000) pop += 10
  else if (stars > 0) pop += 5

  const vc = reg.versions.total
  if (vc > 100) pop += 20
  else if (vc > 20) pop += 15
  else if (vc > 5) pop += 10
  else pop += 5

  if (days < 30) pop += 15
  else if (days < 90) pop += 10
  else if (days < 365) pop += 5

  if (maintainers >= 5) pop += 15
  else if (maintainers >= 3) pop += 10
  else if (maintainers >= 2) pop += 5
  pop = clamp(pop)

  const overall = Math.round(sec * WEIGHTS.security + qual * WEIGHTS.quality + pop * WEIGHTS.popularity)

  return { security: sec, quality: qual, popularity: pop, overall }
}

function clamp(n: number): number { return Math.max(0, Math.min(100, n)) }
