import type { PackageData } from '~/core/package/package.types'
import { computeScores } from '~/core/package/package.scoring'
import { vulnSummary } from '~/core/package/package.decision'
import { getLicensePermissions, type LicensePermission } from '~/core/package/license.registry'
import { formatBytes, formatNumber, getPackageAbbr, timeAgo, formatDate } from './package.presenter'
import { presentScore, type ScoreViewModel } from './score.presenter'

export interface StatViewModel {
  label: string
  value: string
  sub: string
  valueColor: string | null
}

export interface QuickLinkViewModel {
  label: string
  description: string
  href: string
}

export interface RecentVersionViewModel {
  version: string
  date: string
}

export interface SidebarViewModel {
  scores: ScoreViewModel[]
  overallScore: number
  maintainerCount: number
  installCommand: string
  license: string
  licensePermissions: LicensePermission[]
  quickLinks: QuickLinkViewModel[]
  recentVersions: RecentVersionViewModel[]
}

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

function buildMetadataLine(data: PackageData): string {
  const parts: string[] = []
  if (data.registry.license) parts.push(data.registry.license)
  parts.push('v' + data.registry.latestVersion)
  const nodeEngine = data.registry.latest?.engines?.node
  if (nodeEngine) parts.push('Node ' + nodeEngine)
  if (data.registry.latest?.hasTypes) parts.push('TypeScript')
  return parts.join(' · ')
}

function buildQuickLinks(data: PackageData): QuickLinkViewModel[] {
  const name = data.registry.name
  const links: QuickLinkViewModel[] = [
    { label: 'npm', description: 'View on npm', href: `https://www.npmjs.com/package/${name}` },
  ]
  if (data.github) {
    links.push({ label: 'GitHub', description: 'View on GitHub', href: `https://github.com/${data.github.repo}` })
  }
  links.push(
    { label: 'Bundlephobia', description: 'Check bundle size', href: `https://bundlephobia.com/package/${name}` },
    { label: 'Snyk', description: 'Analyze security', href: `https://snyk.io/advisor/npm-package/${name}` },
    { label: 'Socket', description: 'Scan supply chain', href: `https://socket.dev/npm/package/${name}` },
  )
  return links
}

function computeMaintainerRisk(count: number): string | null {
  if (count === 1) return 'risk-high'
  if (count === 2) return 'risk-medium'
  return null
}

export function presentPackageHeader(data: PackageData): PackageHeaderViewModel {
  const scores = computeScores(data)
  const depCount = Object.keys(data.registry.latest?.dependencies || {}).length
  const peerCount = Object.keys(data.registry.latest?.peerDependencies || {}).length

  const recentVersions: RecentVersionViewModel[] = data.registry.versions.stable
    .slice(0, 3)
    .map((v) => ({ version: v.version, date: formatDate(v.date) }))

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
      installCommand: `npm install ${data.registry.name}`,
      license: data.registry.license || '—',
      licensePermissions: getLicensePermissions(data.registry.license),
      quickLinks: buildQuickLinks(data),
      recentVersions,
    },
  }
}

function buildDepsVulnBanner(data: PackageData): DepsVulnBannerViewModel | null {
  const dv = data.depsVulnerabilities
  if (!dv || dv.length === 0) return null

  const totalDeps = Object.keys(data.registry.latest?.dependencies || {}).length
  const totalVulns = dv.reduce((sum, d) => sum + d.vulnCount, 0)

  const SEV_PRIORITY: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
  const items = [...dv]
    .sort((a, b) => (SEV_PRIORITY[a.vulns[0]?.severity ?? 'low'] ?? 3) - (SEV_PRIORITY[b.vulns[0]?.severity ?? 'low'] ?? 3))
    .slice(0, 5)
    .map((d) => ({
      name: d.name,
      vulnCount: d.vulnCount,
      severity: d.vulns[0]?.severity ?? 'medium',
      topCve: d.vulns[0]?.cve ?? '',
    }))

  return { totalVulns, affectedDeps: dv.length, totalDeps, items }
}
