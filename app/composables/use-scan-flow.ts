import { fetchScanResults } from '~/gateway/scan.gateway'

export interface ScanSummary {
  totalPackages: number
  totalVulns: number
  affectedPackages: number
  cleanPackages: number
}

export interface ScanDepResult {
  name: string
  version: string
  vulnCount: number
  vulns: readonly { id: string; summary: string; severity: string; cve: string }[]
}

export interface ScanResult {
  ecosystem: string
  summary: ScanSummary
  dependencies: ScanDepResult[]
  devDependencies: ScanDepResult[]
}

// Shared state across pages via Nuxt useState
export function useScanFlow() {
  const result = useState<ScanResult | null>('scan-result', () => null)
  const loading = useState<boolean>('scan-loading', () => false)
  const error = useState<string | null>('scan-error', () => null)

  async function scanFile(content: string, filename: string | null): Promise<void> {
    loading.value = true
    error.value = null
    result.value = null

    try {
      result.value = await fetchScanResults(content, filename)
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Scan failed'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    result.value = null
    error.value = null
  }

  return { result, loading, error, scanFile, reset }
}
