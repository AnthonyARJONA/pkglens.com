// ── Scoring weights ──
export const SCORE_WEIGHTS = {
  security: 0.4,
  quality: 0.3,
  popularity: 0.3,
} as const

// ── Vulnerability severity ──
export const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

export const SEVERITY_PENALTIES: Record<string, number> = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 4,
}

// ── Bundle size thresholds (gzipped bytes) ──
export const BUNDLE_THRESHOLDS = {
  tiny: 5_000,
  small: 20_000,
  medium: 50_000,
  large: 150_000,
} as const

// ── Download thresholds (weekly) ──
export const DOWNLOAD_THRESHOLDS = {
  massive: 10_000_000,
  large: 1_000_000,
  medium: 100_000,
  small: 10_000,
} as const

// ── GitHub star thresholds ──
export const STAR_THRESHOLDS = {
  huge: 50_000,
  large: 10_000,
  medium: 1_000,
} as const

// ── Time thresholds (days) ──
export const TIME_THRESHOLDS = {
  recent: 30,
  active: 90,
  stale: 365,
} as const

// ── Milliseconds ──
export const MS_PER_DAY = 86_400_000

// ── UI ──
export const DEBOUNCE_SEARCH_MS = 300
export const COPY_FEEDBACK_MS = 1_500
