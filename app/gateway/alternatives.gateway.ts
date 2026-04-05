export interface AlternativeData {
  name: string
  description: string
  version: string
  license: string | null
  weeklyDownloads: number | null
}

export async function fetchAlternatives(packageName: string): Promise<AlternativeData[]> {
  const res = await $fetch<{ alternatives: AlternativeData[] }>(`/api/alternatives/${encodeURIComponent(packageName)}`)
  return res.alternatives
}
