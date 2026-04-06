export interface PackageData {
  meta: {
    stale: boolean
    fetchedAt: string
    ecosystem?: string
  }
  registry: RegistryData
  downloads: DownloadsData | null
  bundle: BundleData | null
  vulnerabilities: readonly VulnData[]
  github: GithubData | null
  releases: readonly ReleaseData[]
  alternatives: readonly string[] | null
  depsVulnerabilities: readonly DepVulnResult[]
}

export interface DepVulnResult {
  name: string
  version: string
  vulnCount: number
  vulns: readonly {
    id: string
    summary: string
    severity: string
    cve: string
  }[]
}

export interface RegistryData {
  name: string
  description: string
  latestVersion: string
  license: string | null
  time: Record<string, string>
  distTags: Record<string, string>
  repository: { type: string; url: string } | string | null
  installCommand?: string
  versions: {
    total: number
    stable: readonly VersionEntry[]
    all: readonly VersionEntry[]
  }
  maintainers: readonly string[]
  latest: {
    dependencies: Record<string, string>
    peerDependencies: Record<string, string>
    hasTypes: boolean
    engines: Record<string, string>
    moduleSystem: 'esm' | 'cjs' | 'dual'
  } | null
}

export interface VersionEntry {
  version: string
  date: string | null
}

export interface DownloadsData {
  weekly: number
  sparkline: readonly number[]
}

export interface BundleData {
  size: number
  gzip: number
  dependencySizes: readonly { name: string; approximateSize: number }[]
  installSize: number | null
  installTime: number | null
}

export interface VulnData {
  id: string
  summary: string
  details: string
  aliases: readonly string[]
  published: string
  modified: string
  affected: readonly {
    ranges: readonly {
      type: string
      events: readonly { introduced?: string; fixed?: string }[]
    }[]
  }[]
  severity: readonly { type: string; score: string }[]
  database_specific: {
    severity: string
    cwe_ids?: readonly string[]
  }
}

export interface GithubData {
  stars: number
  forks: number
  openIssues: number
  pushedAt: string
  repo: string
}

export interface ReleaseData {
  tag: string
  body: string
  publishedAt: string
}

export type TabId = 'deps' | 'bundle' | 'security' | 'changelog' | 'alternatives'
