import type { PackageData } from '~/core/package/package.types'

export function buildMetadataLine(data: PackageData): string {
  const parts: string[] = []
  if (data.registry.license) parts.push(data.registry.license)
  parts.push('v' + data.registry.latestVersion)
  const nodeEngine = data.registry.latest?.engines?.node
  if (nodeEngine) parts.push('Node ' + nodeEngine)
  if (data.registry.latest?.hasTypes) parts.push('TypeScript')
  return parts.join(' · ')
}
