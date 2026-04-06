import type { PackageData } from '~/core/package/package.types'
import { fetchPackageData } from '~/gateway/package.gateway'

export function usePackageFlow() {
  const data = ref<PackageData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPackage(name: string, ecosystem: string = 'npm', version?: string): Promise<void> {
    loading.value = true
    error.value = null
    data.value = null

    try {
      data.value = await fetchPackageData(name, ecosystem, version)
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch package'
    } finally {
      loading.value = false
    }
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    fetchPackage,
  }
}
