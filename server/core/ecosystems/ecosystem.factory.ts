import type { EcosystemId, EcosystemResolver } from './ecosystem.interface'

const resolvers = new Map<EcosystemId, EcosystemResolver>()

export function registerEcosystem(resolver: EcosystemResolver): void {
  resolvers.set(resolver.id, resolver)
}

export function getEcosystemResolver(id: EcosystemId): EcosystemResolver | null {
  return resolvers.get(id) ?? null
}

export function getAvailableEcosystems(): EcosystemId[] {
  return [...resolvers.keys()]
}
