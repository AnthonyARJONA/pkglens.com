import type { PackageData } from '~/core/package/package.types'

export interface DepRowViewModel {
  name: string
  version: string
  versionClean: string
  prefix: string
  badgeLabel: string
  badgeClass: string
}

function stripSemverPrefix(range: string): string {
  return range.replace(/^[\^~>=<\s]+/, '').split(' ')[0] || range
}

export interface DepsPanelViewModel {
  packageName: string
  packageVersion: string
  visibleDeps: DepRowViewModel[]
  hiddenCount: number
  allDeps: DepRowViewModel[]
  hasDeps: boolean
  totalCount: number
}

export function presentDepsPanel(data: PackageData): DepsPanelViewModel {
  const depsEntries = Object.entries(data.registry.latest?.dependencies || {})
  const peerEntries = Object.entries(data.registry.latest?.peerDependencies || {})

  const deps: DepRowViewModel[] = depsEntries.map(([name, version], i) => ({
    name,
    version,
    versionClean: stripSemverPrefix(version),
    prefix: i === depsEntries.length - 1 && peerEntries.length === 0 ? '└── ' : '├── ',
    badgeLabel: 'dep',
    badgeClass: 'badge-ok',
  }))

  const peers: DepRowViewModel[] = peerEntries.map(([name, version], i) => ({
    name,
    version,
    versionClean: stripSemverPrefix(version),
    prefix: i === peerEntries.length - 1 ? '└── ' : '├── ',
    badgeLabel: 'peer',
    badgeClass: 'badge-peer',
  }))

  const allDeps = [...deps, ...peers]
  const MAX_VISIBLE = 10

  return {
    packageName: data.registry.name,
    packageVersion: data.registry.latestVersion,
    visibleDeps: allDeps.slice(0, MAX_VISIBLE),
    hiddenCount: Math.max(0, allDeps.length - MAX_VISIBLE),
    allDeps,
    hasDeps: allDeps.length > 0,
    totalCount: allDeps.length,
  }
}
