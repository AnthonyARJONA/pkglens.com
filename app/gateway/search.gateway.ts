export interface SearchResult {
  name: string
  description: string
  version: string
}

export async function fetchSearchResults(query: string, size: number = 5): Promise<SearchResult[]> {
  const res = await $fetch<{ results: SearchResult[] }>(`/api/search?q=${encodeURIComponent(query)}&size=${size}`)
  return res.results
}
