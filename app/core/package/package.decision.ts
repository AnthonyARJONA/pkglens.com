import type { VulnData } from './package.types'

export function getGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 60) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#9ece6a'
  if (score >= 60) return '#e0af68'
  return '#f7768e'
}

export function lastPublishStatus(dateStr: string | null | undefined): 'good' | 'warn' | 'bad' {
  if (!dateStr) return 'warn'
  const days = (Date.now() - new Date(dateStr).getTime()) / 86400000
  if (days < 90) return 'good'
  if (days < 365) return 'warn'
  return 'bad'
}

export function getVersionTag(version: string, latestVersion: string): { label: string; color: string } | null {
  if (version === latestVersion) return { label: 'latest', color: 'accent' }
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/)
  if (!match) return null
  if (match[2] === '0' && match[3] === '0') return { label: 'major', color: 'red' }
  if (match[3] === '0') return { label: 'minor', color: 'cyan' }
  return { label: 'patch', color: 'green' }
}

export function getVulnSeverity(v: VulnData): string {
  return (v.database_specific?.severity || v.severity?.[0]?.type || 'medium').toLowerCase()
}

export function getVulnCve(v: VulnData): string {
  return v.aliases?.find((a) => a.startsWith('CVE')) || v.id
}

export function getVulnGhsa(v: VulnData): string {
  return v.aliases?.find((a) => a.startsWith('GHSA')) || ''
}

export function getVulnFixedVersion(v: VulnData): string | null {
  for (const aff of v.affected || []) {
    for (const range of aff.ranges || []) {
      for (const ev of range.events || []) {
        if (ev.fixed) return ev.fixed
      }
    }
  }
  return null
}

export function vulnSummary(vulns: readonly VulnData[]): string {
  if (vulns.length === 0) return 'none found'
  const counts: Record<string, number> = { critical: 0, high: 0, medium: 0, low: 0 }
  for (const v of vulns) {
    const sev = (v.database_specific?.severity || 'medium').toLowerCase()
    if (sev in counts) counts[sev] = (counts[sev] ?? 0) + 1
  }
  return Object.entries(counts)
    .filter(([, c]) => c > 0)
    .map(([s, c]) => `${c} ${s}`)
    .join(' · ')
}
