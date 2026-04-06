import type { PackageData } from './package.types'
import type { ScoreBreakdown } from './package.scoring'
import { DOWNLOAD_THRESHOLDS, STAR_THRESHOLDS, TIME_THRESHOLDS } from '../constants'
import { daysSinceDate } from '../utils/date.util'

export function computePopularityScore(data: PackageData): ScoreBreakdown {
  const factors: ScoreBreakdown['factors'] = []
  let score = 0

  const weekly = data.downloads?.weekly
  if (weekly) {
    if (weekly > DOWNLOAD_THRESHOLDS.massive) { score += 30; factors.push({ label: '10M+ weekly downloads', impact: 30 }) }
    else if (weekly > DOWNLOAD_THRESHOLDS.large) { score += 25; factors.push({ label: '1M+ weekly downloads', impact: 25 }) }
    else if (weekly > DOWNLOAD_THRESHOLDS.medium) { score += 20; factors.push({ label: '100K+ weekly downloads', impact: 20 }) }
    else if (weekly > DOWNLOAD_THRESHOLDS.small) { score += 15; factors.push({ label: '10K+ weekly downloads', impact: 15 }) }
    else { score += 5; factors.push({ label: '<10K weekly downloads', impact: 5 }) }
  }

  const stars = data.github?.stars
  if (stars) {
    if (stars > STAR_THRESHOLDS.huge) { score += 20; factors.push({ label: '50K+ GitHub stars', impact: 20 }) }
    else if (stars > STAR_THRESHOLDS.large) { score += 15; factors.push({ label: '10K+ GitHub stars', impact: 15 }) }
    else if (stars > STAR_THRESHOLDS.medium) { score += 10; factors.push({ label: '1K+ GitHub stars', impact: 10 }) }
    else { score += 5; factors.push({ label: '<1K GitHub stars', impact: 5 }) }
  }

  const versionCount = data.registry.versions.total
  if (versionCount > 100) { score += 20; factors.push({ label: `${versionCount} versions — very mature`, impact: 20 }) }
  else if (versionCount > 20) { score += 15; factors.push({ label: `${versionCount} versions — mature`, impact: 15 }) }
  else if (versionCount > 5) { score += 10; factors.push({ label: `${versionCount} versions`, impact: 10 }) }
  else { score += 5; factors.push({ label: `${versionCount} versions — early`, impact: 5 }) }

  const days = daysSinceDate(data.registry.lastPublishDate)
  if (days < TIME_THRESHOLDS.recent) { score += 15; factors.push({ label: 'Released this month', impact: 15 }) }
  else if (days < TIME_THRESHOLDS.active) { score += 10; factors.push({ label: 'Released recently', impact: 10 }) }
  else if (days < TIME_THRESHOLDS.stale) { score += 5; factors.push({ label: 'Released this year', impact: 5 }) }

  const maintainerCount = data.registry.maintainers.length
  if (maintainerCount >= 5) { score += 15; factors.push({ label: `${maintainerCount} maintainers — strong team`, impact: 15 }) }
  else if (maintainerCount >= 3) { score += 10; factors.push({ label: `${maintainerCount} maintainers`, impact: 10 }) }
  else if (maintainerCount >= 2) { score += 5; factors.push({ label: `${maintainerCount} maintainers`, impact: 5 }) }

  return { score: Math.max(0, Math.min(100, score)), factors }
}
