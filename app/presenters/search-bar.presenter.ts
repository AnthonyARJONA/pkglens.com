import { detectEcosystem, ECOSYSTEMS, type EcosystemId, type EcosystemMeta } from '~/core/ecosystem/ecosystem.types'

export type { EcosystemId, EcosystemMeta }

export function getEcosystems(): EcosystemMeta[] {
  return ECOSYSTEMS
}

export function detectEcosystemFromQuery(query: string): EcosystemId | null {
  return detectEcosystem(query)
}

export function findEcosystemMeta(id: EcosystemId): EcosystemMeta {
  return ECOSYSTEMS.find((e) => e.id === id)!
}
