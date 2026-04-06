import { fetchAlternatives, type AlternativeData } from '~/gateway/alternatives.gateway'

export type AlternativeInfo = AlternativeData

export function useAlternativesFlow() {
  const alternatives = ref<AlternativeInfo[]>([])
  const loading = ref(false)

  async function load(packageName: string, ecosystem: string = 'npm'): Promise<void> {
    loading.value = true
    try {
      alternatives.value = await fetchAlternatives(packageName, ecosystem)
    } catch {
      alternatives.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    alternatives: readonly(alternatives),
    loading: readonly(loading),
    fetchAlternatives: load,
  }
}
