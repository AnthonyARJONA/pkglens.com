import type { PackageData } from '~/core/package/package.types'

export async function fetchPackageData(name: string): Promise<PackageData> {
  return $fetch<PackageData>(`/api/package/${encodeURIComponent(name)}`)
}
