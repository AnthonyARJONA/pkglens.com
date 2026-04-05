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
  summary: ScanSummary
  dependencies: ScanDepResult[]
  devDependencies: ScanDepResult[]
}

export function useScanFlow() {
  const result = ref<ScanResult | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function scanPackageJson(content: string): Promise<void> {
    loading.value = true
    error.value = null
    result.value = null

    try {
      const parsed = JSON.parse(content)
      if (!parsed.dependencies && !parsed.devDependencies) {
        error.value = 'No dependencies found in package.json'
        return
      }

      result.value = await $fetch<ScanResult>('/api/scan', {
        method: 'POST',
        body: {
          dependencies: parsed.dependencies || {},
          devDependencies: parsed.devDependencies || {},
        },
      })
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        error.value = 'Invalid JSON format'
      } else {
        error.value = err instanceof Error ? err.message : 'Scan failed'
      }
    } finally {
      loading.value = false
    }
  }

  function reset() {
    result.value = null
    error.value = null
  }

  return {
    result: readonly(result),
    loading: readonly(loading),
    error: readonly(error),
    scanPackageJson,
    reset,
  }
}
