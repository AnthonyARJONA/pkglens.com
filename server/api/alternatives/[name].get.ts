import { getEcosystemResolver } from '../../core/ecosystems/ecosystem.factory'
import type { EcosystemId } from '../../core/ecosystems/ecosystem.interface'
import { getCuratedAlternatives } from '../../data/alternatives'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required' })
  }

  const query = getQuery(event)
  const ecosystem = (query.ecosystem as EcosystemId) || 'npm'

  const resolver = getEcosystemResolver(ecosystem)
  if (!resolver) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported ecosystem' })
  }

  const decodedName = validatePackageName(decodeURIComponent(name), ecosystem)
  const curatedNames = getCuratedAlternatives(decodedName)

  if (!curatedNames || curatedNames.length === 0) {
    return { alternatives: [] }
  }

  const results = await Promise.allSettled(
    curatedNames.map(async (altName) => {
      const [regRes, dlRes] = await Promise.all([
        resolver.fetchRegistry(altName),
        resolver.fetchDownloads(altName),
      ])

      if (!regRes.data) return null

      return {
        name: altName,
        description: regRes.data.description || '',
        version: regRes.data.latestVersion,
        license: regRes.data.license,
        weeklyDownloads: dlRes.data?.weekly ?? null,
      }
    }),
  )

  return {
    alternatives: results
      .map((r) => (r.status === 'fulfilled' ? r.value : null))
      .filter(Boolean),
  }
})
