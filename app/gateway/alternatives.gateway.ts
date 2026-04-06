export interface AlternativeData {
  name: string
  description: string
  version: string
  license: string | null
  weeklyDownloads: number | null
}

export async function fetchAlternatives(packageName: string, ecosystem: string = 'npm'): Promise<AlternativeData[]> {
  const res = await $fetch<{ alternatives: AlternativeData[] }>(`/api/alternatives/${encodeURIComponent(packageName)}?ecosystem=${ecosystem}`)
  return res.alternatives
}
