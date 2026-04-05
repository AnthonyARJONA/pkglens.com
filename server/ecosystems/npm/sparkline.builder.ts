export function buildSparkline(rangeData: { downloads: Array<{ downloads: number; day: string }> } | null): number[] {
  if (!rangeData?.downloads?.length) return []

  const daily = rangeData.downloads
  const weeks: number[] = []
  for (let i = 0; i < daily.length; i += 7) {
    const chunk = daily.slice(i, i + 7)
    const sum = chunk.reduce((acc, d) => acc + d.downloads, 0)
    weeks.push(sum)
  }

  return weeks
}
