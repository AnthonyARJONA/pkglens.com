export interface AlternativeInfo {
  name: string
  description: string
  version: string
  license: string | null
  weeklyDownloads: number | null
}

export function useAlternativesFlow() {
  const alternatives = ref<AlternativeInfo[]>([])
  const loading = ref(false)

  async function fetchAlternatives(names: readonly string[]): Promise<void> {
    loading.value = true
    alternatives.value = []

    try {
      const results = await Promise.allSettled(
        names.map(async (name): Promise<AlternativeInfo | null> => {
          const [regRes, dlRes] = await Promise.allSettled([
            $fetch<{ version: string; description: string; license: string }>(
              `https://registry.npmjs.org/${encodeURIComponent(name)}/latest`,
            ),
            $fetch<{ downloads: number }>(
              `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name)}`,
            ),
          ])

          const reg = regRes.status === 'fulfilled' ? regRes.value : null
          if (!reg) return null

          const dl = dlRes.status === 'fulfilled' ? dlRes.value : null

          return {
            name,
            description: reg.description || '',
            version: reg.version || '',
            license: reg.license || null,
            weeklyDownloads: dl?.downloads ?? null,
          }
        }),
      )

      alternatives.value = results
        .map((r) => (r.status === 'fulfilled' ? r.value : null))
        .filter((v): v is AlternativeInfo => v !== null)
    } finally {
      loading.value = false
    }
  }

  return {
    alternatives: readonly(alternatives),
    loading: readonly(loading),
    fetchAlternatives,
  }
}
