import type { PackageData } from './package.types'
import type { ScoreBreakdown } from './package.scoring'
import { SEVERITY_PENALTIES, TIME_THRESHOLDS } from '../constants'
import { daysSinceDate } from '../utils/date.util'

export function computeSecurityScore(data: PackageData): ScoreBreakdown {
  const factors: ScoreBreakdown['factors'] = []
  let score = 100

  const vulns = data.vulnerabilities
  if (vulns.length === 0) {
    factors.push({ label: 'No known vulnerabilities', impact: 0 })
  } else {
    const counts: Record<string, number> = {}
    for (const v of vulns) {
      const sev = (v.database_specific?.severity || 'low').toLowerCase()
      const penalty = SEVERITY_PENALTIES[sev] ?? SEVERITY_PENALTIES.low!
      score -= penalty!
      counts[sev] = (counts[sev] ?? 0) + 1
    }
    for (const [sev, count] of Object.entries(counts)) {
      const penalty = (SEVERITY_PENALTIES[sev] ?? SEVERITY_PENALTIES.low!) * count
      factors.push({ label: `${count} ${sev} vuln${count > 1 ? 's' : ''}`, impact: -penalty })
    }
  }

  const depsVulns = data.depsVulnerabilities
  if (depsVulns.length > 0) {
    const total = depsVulns.reduce((s, d) => s + d.vulnCount, 0)
    const penalty = Math.min(20, total * 3)
    score -= penalty
    factors.push({ label: `${total} vuln${total > 1 ? 's' : ''} in ${depsVulns.length} dep${depsVulns.length > 1 ? 's' : ''}`, impact: -penalty })
  } else if (Object.keys(data.registry.latest?.dependencies || {}).length > 0) {
    factors.push({ label: 'No vulns in dependencies', impact: 0 })
  }

  const maintainerCount = data.registry.maintainers.length
  if (maintainerCount === 1) {
    score -= 10
    factors.push({ label: 'Single maintainer — supply chain risk', impact: -10 })
  } else if (maintainerCount >= 3) {
    factors.push({ label: `${maintainerCount} maintainers`, impact: 0 })
  }

  const days = daysSinceDate(data.registry.lastPublishDate)
  if (days > TIME_THRESHOLDS.stale) {
    score -= 10
    factors.push({ label: 'No release in over a year', impact: -10 })
  }

  return { score: Math.max(0, Math.min(100, score)), factors }
}
