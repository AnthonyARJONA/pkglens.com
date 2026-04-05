import type { PackageData } from '~/core/package/package.types'
import { SEVERITY_ORDER } from '~/core/constants'

export interface DepsVulnBannerViewModel {
  totalVulns: number
  affectedDeps: number
  totalDeps: number
  items: Array<{
    name: string
    vulnCount: number
    severity: string
    topCve: string
  }>
}

export function buildDepsVulnBanner(data: PackageData): DepsVulnBannerViewModel | null {
  const dv = data.depsVulnerabilities
  if (!dv || dv.length === 0) return null

  const totalDeps = Object.keys(data.registry.latest?.dependencies || {}).length
  const totalVulns = dv.reduce((sum, d) => sum + d.vulnCount, 0)

  const items = [...dv]
    .sort((a, b) => (SEVERITY_ORDER[a.vulns[0]?.severity ?? 'low'] ?? 3) - (SEVERITY_ORDER[b.vulns[0]?.severity ?? 'low'] ?? 3))
    .slice(0, 5)
    .map((d) => ({
      name: d.name,
      vulnCount: d.vulnCount,
      severity: d.vulns[0]?.severity ?? 'medium',
      topCve: d.vulns[0]?.cve ?? '',
    }))

  return { totalVulns, affectedDeps: dv.length, totalDeps, items }
}
