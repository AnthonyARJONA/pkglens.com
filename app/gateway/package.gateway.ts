import type { PackageData } from '~/core/package/package.types'

export async function fetchPackageData(name: string, ecosystem: string = 'npm', version?: string): Promise<PackageData> {
  const params = new URLSearchParams({ name, ecosystem })
  if (version) params.set('version', version)
  return $fetch<PackageData>(`/api/pkg?${params.toString()}`)
}
