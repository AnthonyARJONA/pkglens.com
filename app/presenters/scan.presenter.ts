import type { ScanResult } from '~/composables/use-scan-flow'
import type { DeepReadonly } from 'vue'

type ScanDepResult = ScanResult['dependencies'][number]

export interface ScanRowViewModel {
  name: string
  version: string
  vulnCount: number
  topSeverity: string
  topCve: string
  isClean: boolean
}

export interface ScanResultViewModel {
  totalPackages: number
  totalVulns: number
  affectedPackages: number
  cleanPackages: number
  deps: ScanRowViewModel[]
  devDeps: ScanRowViewModel[]
}

function presentDep(d: ScanDepResult): ScanRowViewModel {
  return {
    name: d.name,
    version: d.version,
    vulnCount: d.vulnCount,
    topSeverity: d.vulns[0]?.severity ?? '',
    topCve: d.vulns[0]?.cve ?? '',
    isClean: d.vulnCount === 0,
  }
}

export function presentScanResult(result: DeepReadonly<ScanResult>): ScanResultViewModel {
  return {
    ...result.summary,
    deps: result.dependencies.map(presentDep),
    devDeps: result.devDependencies.map(presentDep),
  }
}
