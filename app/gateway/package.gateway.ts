import type { PackageData } from '~/core/package/package.types'

export async function fetchPackageData(name: string, ecosystem: string = 'npm'): Promise<PackageData> {
  return $fetch<PackageData>(`/api/package/${ecosystem}/${encodeURIComponent(name)}`)
}
