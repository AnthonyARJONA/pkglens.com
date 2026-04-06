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
  depsLabel: string
  devDepsLabel: string
  deps: ScanRowViewModel[]
  devDeps: ScanRowViewModel[]
}

const LABELS: Record<string, { deps: string; devDeps: string }> = {
  npm: { deps: 'Vulnerable Dependencies', devDeps: 'Vulnerable DevDependencies' },
  packagist: { deps: 'Vulnerable require', devDeps: 'Vulnerable require-dev' },
  pypi: { deps: 'Vulnerable Packages', devDeps: 'Vulnerable Dev Packages' },
  cargo: { deps: 'Vulnerable Dependencies', devDeps: 'Vulnerable Dev Dependencies' },
  go: { deps: 'Vulnerable Modules', devDeps: 'Vulnerable Dev Modules' },
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
  const labels = LABELS[result.ecosystem] ?? LABELS.npm!

  return {
    ...result.summary,
    depsLabel: labels.deps,
    devDepsLabel: labels.devDeps,
    deps: result.dependencies.map(presentDep),
    devDeps: result.devDependencies.map(presentDep),
  }
}
