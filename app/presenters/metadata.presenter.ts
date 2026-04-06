import type { PackageData } from '~/core/package/package.types'

export function buildMetadataLine(data: PackageData): string {
  const parts: string[] = []
  if (data.registry.license) parts.push(data.registry.license)
  const ver = data.registry.latestVersion
  parts.push(ver.startsWith('v') ? ver : 'v' + ver)

  const engines = data.registry.latest?.engines || {}

  // PHP version
  if (engines.php) parts.push('PHP ' + engines.php)

  // Node version
  if (engines.node) parts.push('Node ' + engines.node)

  // PHP extensions (ext-*)
  const extensions = Object.keys(engines).filter((k) => k.startsWith('ext-'))
  if (extensions.length > 0) {
    const display = extensions.slice(0, 3).join(' · ')
    const suffix = extensions.length > 3 ? ` +${extensions.length - 3}` : ''
    parts.push(display + suffix)
  }

  // TypeScript (JS only)
  if (data.registry.latest?.hasTypes) parts.push('TypeScript')

  return parts.join(' · ')
}
