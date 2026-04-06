import type { ScanResult } from '../composables/use-scan-flow'

export async function fetchScanResults(content: string, filename: string | null): Promise<ScanResult> {
  return $fetch<ScanResult>('/api/scan', {
    method: 'POST',
    body: { content, filename },
  })
}
