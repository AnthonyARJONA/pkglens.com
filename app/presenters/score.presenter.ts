import type { ScoreBreakdown, ScoreFactor } from '~/core/package/package.scoring'
import { getGrade, getScoreColor } from '~/core/package/package.decision'

export interface ScoreFactorViewModel {
  label: string
  impact: string
  isPositive: boolean
  isNegative: boolean
}

export interface ScoreViewModel {
  value: number
  label: string
  color: string
  grade: string
  circumference: number
  dashOffset: number
  factors: ScoreFactorViewModel[]
}

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function presentFactor(f: ScoreFactor): ScoreFactorViewModel {
  return {
    label: f.label,
    impact: f.impact > 0 ? `+${f.impact}` : f.impact === 0 ? '—' : String(f.impact),
    isPositive: f.impact > 0,
    isNegative: f.impact < 0,
  }
}

export function presentScore(breakdown: ScoreBreakdown, label: string): ScoreViewModel {
  return {
    value: breakdown.score,
    label,
    color: getScoreColor(breakdown.score),
    grade: getGrade(breakdown.score),
    circumference: CIRCUMFERENCE,
    dashOffset: CIRCUMFERENCE - (breakdown.score / 100) * CIRCUMFERENCE,
    factors: breakdown.factors.map(presentFactor),
  }
}
