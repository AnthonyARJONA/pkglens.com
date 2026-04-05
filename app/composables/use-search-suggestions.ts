export interface SearchSuggestion {
  name: string
  description: string
  version: string
}

export function useSearchSuggestions() {
  const suggestions = ref<SearchSuggestion[]>([])
  const loading = ref(false)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function search(query: string) {
    if (debounceTimer) clearTimeout(debounceTimer)
    const trimmed = query.trim()

    if (trimmed.length < 2) {
      suggestions.value = []
      return
    }

    debounceTimer = setTimeout(async () => {
      loading.value = true
      try {
        const res = await $fetch<{ objects: Array<{ package: { name: string; description: string; version: string } }> }>(
          `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(trimmed)}&size=5`,
        )
        suggestions.value = (res.objects || []).map((o) => ({
          name: o.package.name,
          description: (o.package.description || '').slice(0, 80),
          version: o.package.version,
        }))
      } catch {
        suggestions.value = []
      } finally {
        loading.value = false
      }
    }, 300)
  }

  function clear() {
    suggestions.value = []
    if (debounceTimer) clearTimeout(debounceTimer)
  }

  return { suggestions: readonly(suggestions), loading: readonly(loading), search, clear }
}
