export const ECOSYSTEM_IDS = ['npm', 'pypi', 'cargo', 'packagist', 'go'] as const

export type EcosystemId = (typeof ECOSYSTEM_IDS)[number]

export interface EcosystemMeta {
  id: EcosystemId
  label: string
  placeholder: string
  available: boolean
}

export const ECOSYSTEMS: EcosystemMeta[] = [
  { id: 'npm', label: 'npm', placeholder: 'Search npm packages…', available: true },
  { id: 'packagist', label: 'Packagist', placeholder: 'Search PHP packages…', available: true },
]

export function detectEcosystem(query: string): EcosystemId | null {
  if (query.startsWith('@') && query.includes('/')) return 'npm'
  if (query.includes('/') && !query.startsWith('@')) return 'packagist'
  return null
}
