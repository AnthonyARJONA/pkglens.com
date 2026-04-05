import type { PackageData } from '~/core/package/package.types'
import { computeScores } from '~/core/package/package.scoring'
import { vulnSummary } from '~/core/package/package.decision'
import { getLicensePermissions, type LicensePermission } from '~/core/package/license.registry'
import { formatBytes, formatNumber, getPackageAbbr, formatDate } from './package.presenter'
import { presentScore, type ScoreViewModel } from './score.presenter'
import { buildMetadataLine } from './metadata.presenter'
import { buildQuickLinks, buildInstallCommand, type QuickLinkViewModel } from './quick-links.presenter'
import { buildDepsVulnBanner, type DepsVulnBannerViewModel } from './deps-vuln-banner.presenter'

export interface StatViewModel {
  label: string
  value: string
  sub: string
  valueColor: string | null
}

export interface SidebarViewModel {
  scores: ScoreViewModel[]
  overallScore: number
  maintainerCount: number
  installCommand: string
  license: string
  licensePermissions: LicensePermission[]
  quickLinks: QuickLinkViewModel[]
  recentVersions: Array<{ version: string; date: string }>
}

export interface PackageHeaderViewModel {
  abbr: string
  name: string
  description: string
  metadataLine: string
  stats: StatViewModel[]
  vulnCount: number
  vulnBadgeClass: string
  depsVulnBanner: DepsVulnBannerViewModel | null
  sidebar: SidebarViewModel
}

export function presentPackageHeader(data: PackageData): PackageHeaderViewModel {
  const scores = computeScores(data)
  const depCount = Object.keys(data.registry.latest?.dependencies || {}).length
  const peerCount = Object.keys(data.registry.latest?.peerDependencies || {}).length

  return {
    abbr: getPackageAbbr(data.registry.name),
    name: data.registry.name,
    description: data.registry.description,
    metadataLine: buildMetadataLine(data),
    stats: [
      { label: 'Bundle Size', value: data.bundle ? formatBytes(data.bundle.size) : '—', sub: data.bundle ? formatBytes(data.bundle.gzip) + ' gzipped' : '', valueColor: null },
      { label: 'Dependencies', value: String(depCount), sub: `${depCount} direct · ${peerCount} peer`, valueColor: null },
      { label: 'Weekly Downloads', value: data.downloads ? formatNumber(data.downloads.weekly) : '—', sub: data.downloads ? 'last 7 days' : '', valueColor: null },
      { label: 'Vulnerabilities', value: String(data.vulnerabilities.length), sub: vulnSummary(data.vulnerabilities), valueColor: data.vulnerabilities.length > 0 ? 'var(--red)' : 'var(--green)' },
    ],
    vulnCount: data.vulnerabilities.length,
    vulnBadgeClass: data.vulnerabilities.length > 0 ? 'tab-badge-red' : 'tab-badge-green',
    depsVulnBanner: buildDepsVulnBanner(data),
    sidebar: {
      scores: [
        presentScore(scores.security, 'security'),
        presentScore(scores.quality, 'quality'),
        presentScore(scores.popularity, 'popularity'),
      ],
      overallScore: scores.overall,
      maintainerCount: data.registry.maintainers.length,
      installCommand: buildInstallCommand(data.registry.name),
      license: data.registry.license || '—',
      licensePermissions: getLicensePermissions(data.registry.license),
      quickLinks: buildQuickLinks(data),
      recentVersions: data.registry.versions.stable.slice(0, 3).map((v) => ({ version: v.version, date: formatDate(v.date) })),
    },
  }
}
