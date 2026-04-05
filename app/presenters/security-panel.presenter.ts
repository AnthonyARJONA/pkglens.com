import type { PackageData, VulnData } from '~/core/package/package.types'
import { getVulnSeverity, getVulnCve, getVulnGhsa, getVulnFixedVersion, vulnSummary } from '~/core/package/package.decision'
import { formatDate } from './package.presenter'

export interface VulnViewModel {
  id: string
  severity: string
  cve: string
  ghsa: string | null
  description: string
  publishedDate: string | null
  cweIds: string | null
  fixedVersion: string | null
}

export interface SecurityPanelViewModel {
  hasVulns: boolean
  vulnCount: number
  summaryText: string
  packageLabel: string
  vulns: VulnViewModel[]
}

const SEV_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

function presentVuln(v: VulnData): VulnViewModel {
  const ghsa = getVulnGhsa(v)
  const cweIds = v.database_specific?.cwe_ids
  return {
    id: v.id,
    severity: getVulnSeverity(v),
    cve: getVulnCve(v),
    ghsa: ghsa || null,
    description: v.summary || v.details?.slice(0, 300) || '',
    publishedDate: v.published ? formatDate(v.published) : null,
    cweIds: cweIds?.length ? cweIds.join(', ') : null,
    fixedVersion: getVulnFixedVersion(v),
  }
}

export function presentSecurityPanel(data: PackageData): SecurityPanelViewModel {
  const sorted = [...data.vulnerabilities].sort((a, b) => {
    const sa = SEV_ORDER[getVulnSeverity(a)] ?? 2
    const sb = SEV_ORDER[getVulnSeverity(b)] ?? 2
    return sa - sb
  })

  const count = data.vulnerabilities.length

  return {
    hasVulns: count > 0,
    vulnCount: count,
    summaryText: `Found ${count} vulnerabilit${count > 1 ? 'ies' : 'y'} — ${vulnSummary(data.vulnerabilities)}`,
    packageLabel: `${data.registry.name}@${data.registry.latestVersion}`,
    vulns: sorted.map(presentVuln),
  }
}
