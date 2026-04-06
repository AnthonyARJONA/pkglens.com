import { fetchSearchResults, type SearchResult } from '~/gateway/search.gateway'
import { DEBOUNCE_SEARCH_MS } from '~/core/constants'

export type SearchSuggestion = SearchResult

export function useSearchSuggestions() {
  const suggestions = ref<SearchSuggestion[]>([])
  const loading = ref(false)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function search(query: string, ecosystem: string = 'npm') {
    if (debounceTimer) clearTimeout(debounceTimer)

    if (query.trim().length < 2) {
      suggestions.value = []
      return
    }

    debounceTimer = setTimeout(async () => {
      loading.value = true
      try {
        suggestions.value = await fetchSearchResults(query.trim(), 5, ecosystem)
      } catch {
        suggestions.value = []
      } finally {
        loading.value = false
      }
    }, DEBOUNCE_SEARCH_MS)
  }

  function clear() {
    suggestions.value = []
    if (debounceTimer) clearTimeout(debounceTimer)
  }

  return { suggestions: readonly(suggestions), loading: readonly(loading), search, clear }
}
