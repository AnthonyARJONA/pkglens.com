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
  { id: 'pypi', label: 'PyPI', placeholder: 'Search Python packages…', available: false },
  { id: 'cargo', label: 'Cargo', placeholder: 'Search Rust crates…', available: false },
  { id: 'packagist', label: 'Packagist', placeholder: 'Search PHP packages…', available: true },
  { id: 'go', label: 'Go', placeholder: 'Search Go modules…', available: false },
]

export function detectEcosystem(query: string): EcosystemId | null {
  if (query.startsWith('@') && query.includes('/')) return 'npm'
  if (query.includes('/') && !query.startsWith('@')) return 'go'
  return null
}
