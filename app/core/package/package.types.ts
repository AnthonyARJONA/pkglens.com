export type { RegistryData, VersionEntry } from './registry.types'
export type { BundleData, DownloadsData } from './bundle.types'
export type { VulnData, DepVulnResult } from './vuln.types'
export type { GithubData, ReleaseData } from './github.types'

import type { RegistryData } from './registry.types'
import type { BundleData, DownloadsData } from './bundle.types'
import type { VulnData, DepVulnResult } from './vuln.types'
import type { GithubData, ReleaseData } from './github.types'

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

export type TabId = 'deps' | 'bundle' | 'security' | 'changelog' | 'alternatives'
