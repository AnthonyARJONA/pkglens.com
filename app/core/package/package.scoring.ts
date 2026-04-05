import type { PackageData } from './package.types'
import { SCORE_WEIGHTS } from '../constants'
import { computeSecurityScore } from './security.scoring'
import { computeQualityScore } from './quality.scoring'
import { computePopularityScore } from './popularity.scoring'

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

  const overall = Math.round(
    security.score * SCORE_WEIGHTS.security
    + quality.score * SCORE_WEIGHTS.quality
    + popularity.score * SCORE_WEIGHTS.popularity,
  )

  return { security, quality, popularity, overall }
}
