import type { PackageData, VulnData, BundleData } from './package.types'

export interface ScoreFactor {
  label: string
  impact: number
}

export interface ScoreBreakdown {
  score: number
  factors: ScoreFactor[]
}

export interface PackageScores {
  security: ScoreBreakdown
  quality: ScoreBreakdown
  popularity: ScoreBreakdown
  overall: number
}

export function computeScores(data: PackageData): PackageScores {
  const security = computeSecurityScore(data)
  const quality = computeQualityScore(data)
  const popularity = computePopularityScore(data)
  const overall = Math.round(security.score * 0.4 + quality.score * 0.3 + popularity.score * 0.3)

  return { security, quality, popularity, overall }
}

// ── Security: starts at 100, loses points for risks ──
function computeSecurityScore(data: PackageData): ScoreBreakdown {
  const factors: ScoreFactor[] = []
  let score = 100

  // Direct CVEs
  const vulns = data.vulnerabilities
  if (vulns.length === 0) {
    factors.push({ label: 'No known vulnerabilities', impact: 0 })
  } else {
    let critical = 0, high = 0, medium = 0, low = 0
    for (const v of vulns) {
      const sev = (v.database_specific?.severity || '').toLowerCase()
      if (sev === 'critical') { score -= 25; critical++ }
      else if (sev === 'high') { score -= 15; high++ }
      else if (sev === 'medium') { score -= 8; medium++ }
      else { score -= 4; low++ }
    }
    if (critical > 0) factors.push({ label: `${critical} critical vuln${critical > 1 ? 's' : ''}`, impact: -(critical * 25) })
    if (high > 0) factors.push({ label: `${high} high vuln${high > 1 ? 's' : ''}`, impact: -(high * 15) })
    if (medium > 0) factors.push({ label: `${medium} medium vuln${medium > 1 ? 's' : ''}`, impact: -(medium * 8) })
    if (low > 0) factors.push({ label: `${low} low vuln${low > 1 ? 's' : ''}`, impact: -(low * 4) })
  }

  // Dependency CVEs
  const depsVulns = data.depsVulnerabilities
  if (depsVulns.length > 0) {
    const totalDepVulns = depsVulns.reduce((s, d) => s + d.vulnCount, 0)
    const penalty = Math.min(20, totalDepVulns * 3)
    score -= penalty
    factors.push({ label: `${totalDepVulns} vuln${totalDepVulns > 1 ? 's' : ''} in ${depsVulns.length} dep${depsVulns.length > 1 ? 's' : ''}`, impact: -penalty })
  } else if (Object.keys(data.registry.latest?.dependencies || {}).length > 0) {
    factors.push({ label: 'No vulns in dependencies', impact: 0 })
  }

  // Maintainers
  const maintainerCount = data.registry.maintainers.length
  if (maintainerCount === 1) {
    score -= 10
    factors.push({ label: 'Single maintainer — supply chain risk', impact: -10 })
  } else if (maintainerCount >= 3) {
    factors.push({ label: `${maintainerCount} maintainers`, impact: 0 })
  }

  // Recency
  const lastPublish = data.registry.time[data.registry.latestVersion]
  if (lastPublish) {
    const daysSince = (Date.now() - new Date(lastPublish).getTime()) / 86400000
    if (daysSince > 365) {
      score -= 10
      factors.push({ label: 'No release in over a year', impact: -10 })
    }
  }

  return { score: clamp(score), factors }
}

// ── Quality: starts at 100, loses points for weaknesses ──
function computeQualityScore(data: PackageData): ScoreBreakdown {
  const factors: ScoreFactor[] = []
  let score = 100

  // Bundle size
  const bundle = data.bundle
  if (!bundle) {
    score -= 10
    factors.push({ label: 'No bundle data available', impact: -10 })
  } else {
    const gzip = bundle.gzip || bundle.size || 0
    if (gzip < 5000) { factors.push({ label: 'Tiny bundle — under 5 kB gz', impact: 0 }) }
    else if (gzip < 20000) { score -= 5; factors.push({ label: 'Small bundle — under 20 kB gz', impact: -5 }) }
    else if (gzip < 50000) { score -= 15; factors.push({ label: 'Medium bundle — under 50 kB gz', impact: -15 }) }
    else if (gzip < 150000) { score -= 25; factors.push({ label: 'Large bundle — over 50 kB gz', impact: -25 }) }
    else { score -= 40; factors.push({ label: 'Very large bundle — over 150 kB gz', impact: -40 }) }
  }

  // Module system — informational, only CJS penalized (real tree-shake impact)
  const moduleSystem = data.registry.latest?.moduleSystem
  if (moduleSystem === 'esm') {
    factors.push({ label: 'Pure ESM — tree-shakeable', impact: 0 })
  } else if (moduleSystem === 'dual') {
    factors.push({ label: 'Dual ESM/CJS', impact: 0 })
  } else {
    score -= 10
    factors.push({ label: 'CommonJS only — not tree-shakeable', impact: -10 })
  }

  // TypeScript — informational, no penalty (types can be separate by design)
  if (data.registry.latest?.hasTypes) {
    factors.push({ label: 'TypeScript types included', impact: 0 })
  } else {
    factors.push({ label: 'Types via @types or none', impact: 0 })
  }

  // Dependencies
  const depCount = Object.keys(data.registry.latest?.dependencies || {}).length
  if (depCount === 0) {
    factors.push({ label: 'Zero dependencies', impact: 0 })
  } else if (depCount <= 5) {
    score -= 5
    factors.push({ label: `${depCount} dependencies`, impact: -5 })
  } else if (depCount <= 15) {
    score -= 10
    factors.push({ label: `${depCount} dependencies`, impact: -10 })
  } else {
    score -= 20
    factors.push({ label: `${depCount} dependencies — heavy`, impact: -20 })
  }

  return { score: clamp(score), factors }
}

// ── Popularity: starts at 0, gains points for adoption ──
function computePopularityScore(data: PackageData): ScoreBreakdown {
  const factors: ScoreFactor[] = []
  let score = 0

  // Downloads
  const weekly = data.downloads?.weekly
  if (weekly) {
    if (weekly > 10_000_000) { score += 30; factors.push({ label: '10M+ weekly downloads', impact: 30 }) }
    else if (weekly > 1_000_000) { score += 25; factors.push({ label: '1M+ weekly downloads', impact: 25 }) }
    else if (weekly > 100_000) { score += 20; factors.push({ label: '100K+ weekly downloads', impact: 20 }) }
    else if (weekly > 10_000) { score += 15; factors.push({ label: '10K+ weekly downloads', impact: 15 }) }
    else { score += 5; factors.push({ label: '<10K weekly downloads', impact: 5 }) }
  }

  // Stars
  const stars = data.github?.stars
  if (stars) {
    if (stars > 50000) { score += 20; factors.push({ label: '50K+ GitHub stars', impact: 20 }) }
    else if (stars > 10000) { score += 15; factors.push({ label: '10K+ GitHub stars', impact: 15 }) }
    else if (stars > 1000) { score += 10; factors.push({ label: '1K+ GitHub stars', impact: 10 }) }
    else { score += 5; factors.push({ label: '<1K GitHub stars', impact: 5 }) }
  }

  // Maturity
  const versionCount = data.registry.versions.total
  if (versionCount > 100) { score += 20; factors.push({ label: `${versionCount} versions — very mature`, impact: 20 }) }
  else if (versionCount > 20) { score += 15; factors.push({ label: `${versionCount} versions — mature`, impact: 15 }) }
  else if (versionCount > 5) { score += 10; factors.push({ label: `${versionCount} versions`, impact: 10 }) }
  else { score += 5; factors.push({ label: `${versionCount} versions — early`, impact: 5 }) }

  // Activity
  const lastPublish = data.registry.time[data.registry.latestVersion]
  if (lastPublish) {
    const daysSince = (Date.now() - new Date(lastPublish).getTime()) / 86400000
    if (daysSince < 30) { score += 15; factors.push({ label: 'Released this month', impact: 15 }) }
    else if (daysSince < 90) { score += 10; factors.push({ label: 'Released recently', impact: 10 }) }
    else if (daysSince < 365) { score += 5; factors.push({ label: 'Released this year', impact: 5 }) }
  }

  // Maintainers
  const maintainerCount = data.registry.maintainers.length
  if (maintainerCount >= 5) { score += 15; factors.push({ label: `${maintainerCount} maintainers — strong team`, impact: 15 }) }
  else if (maintainerCount >= 3) { score += 10; factors.push({ label: `${maintainerCount} maintainers`, impact: 10 }) }
  else if (maintainerCount >= 2) { score += 5; factors.push({ label: `${maintainerCount} maintainers`, impact: 5 }) }

  return { score: clamp(score), factors }
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, score))
}
