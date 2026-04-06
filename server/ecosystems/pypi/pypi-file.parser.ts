import { sanitizeDeps } from '../../utils/safe-deps'

export interface ParsedDependencies {
  ecosystem: 'pypi'
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export function parseRequirementsTxt(content: string): ParsedDependencies | null {
  const lines = content.split('\n')
  const deps: Record<string, string> = {}

  for (const raw of lines) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || line.startsWith('-')) continue
    if (line.startsWith('--')) continue

    // Format: package==1.0, package>=1.0, package~=1.0, package!=1.0, or just package
    const match = line.match(/^([A-Za-z0-9]([A-Za-z0-9._-]*[A-Za-z0-9])?)(.*)/)
    if (!match) continue

    const name = match[1]!.toLowerCase().replace(/[_.]+/g, '-')
    const rest = (match[3] || '').split(';')[0]!.trim() // strip environment markers
    const versionMatch = rest.match(/([><=!~]=?\s*[\d.*]+)/)
    deps[name] = versionMatch ? versionMatch[1]!.trim() : '*'
  }

  if (Object.keys(deps).length === 0) return null

  return {
    ecosystem: 'pypi',
    dependencies: sanitizeDeps(deps),
    devDependencies: {},
  }
}
