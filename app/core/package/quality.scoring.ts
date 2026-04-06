import type { PackageData } from './package.types'
import type { ScoreBreakdown } from './package.scoring'
import { BUNDLE_THRESHOLDS } from '../constants'

const JS_ECOSYSTEMS = new Set(['npm'])

export function computeQualityScore(data: PackageData): ScoreBreakdown {
  const factors: ScoreBreakdown['factors'] = []
  let score = 100
  const isJs = JS_ECOSYSTEMS.has(data.meta.ecosystem || 'npm')

  // Bundle size — only for JS ecosystems
  if (isJs) {
    const bundle = data.bundle
    if (!bundle) {
      score -= 10
      factors.push({ label: 'No bundle data available', impact: -10 })
    } else {
      const gzip = bundle.gzip || bundle.size || 0
      if (gzip < BUNDLE_THRESHOLDS.tiny) { factors.push({ label: 'Tiny bundle — under 5 kB gz', impact: 0 }) }
      else if (gzip < BUNDLE_THRESHOLDS.small) { score -= 5; factors.push({ label: 'Small bundle — under 20 kB gz', impact: -5 }) }
      else if (gzip < BUNDLE_THRESHOLDS.medium) { score -= 15; factors.push({ label: 'Medium bundle — under 50 kB gz', impact: -15 }) }
      else if (gzip < BUNDLE_THRESHOLDS.large) { score -= 25; factors.push({ label: 'Large bundle — over 50 kB gz', impact: -25 }) }
      else { score -= 40; factors.push({ label: 'Very large bundle — over 150 kB gz', impact: -40 }) }
    }

    // Module system — only for JS
    const moduleSystem = data.registry.latest?.moduleSystem
    if (moduleSystem === 'esm') { factors.push({ label: 'Pure ESM — tree-shakeable', impact: 0 }) }
    else if (moduleSystem === 'dual') { factors.push({ label: 'Dual ESM/CJS', impact: 0 }) }
    else { score -= 10; factors.push({ label: 'CommonJS only — not tree-shakeable', impact: -10 }) }

    // TypeScript — only for JS
    if (data.registry.latest?.hasTypes) { factors.push({ label: 'TypeScript types included', impact: 0 }) }
    else { factors.push({ label: 'Types via @types or none', impact: 0 }) }
  }

  // Dependencies — universal
  const depCount = Object.keys(data.registry.latest?.dependencies || {}).length
  if (depCount === 0) { factors.push({ label: 'Zero dependencies', impact: 0 }) }
  else if (depCount <= 5) { score -= 5; factors.push({ label: `${depCount} dependencies`, impact: -5 }) }
  else if (depCount <= 15) { score -= 10; factors.push({ label: `${depCount} dependencies`, impact: -10 }) }
  else { score -= 20; factors.push({ label: `${depCount} dependencies — heavy`, impact: -20 }) }

  return { score: Math.max(0, Math.min(100, score)), factors }
}
