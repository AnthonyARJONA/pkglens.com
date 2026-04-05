import { fetchNpmRegistry, fetchNpmDownloads } from '../../ecosystems/npm/npm-registry.fetcher'
import { getCuratedAlternatives } from '../../data/alternatives'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required' })
  }

  const decodedName = decodeURIComponent(name)
  const curatedNames = getCuratedAlternatives(decodedName)
  if (!curatedNames || curatedNames.length === 0) {
    return { alternatives: [] }
  }

  const results = await Promise.allSettled(
    curatedNames.map(async (altName) => {
      const [regRes, dlRes] = await Promise.allSettled([
        fetchNpmRegistry(altName),
        fetchNpmDownloads(altName),
      ])

      const reg = regRes.status === 'fulfilled' ? regRes.value.data : null
      if (!reg) return null

      const latestVersion = reg['dist-tags']?.latest || ''
      const latestData = reg.versions?.[latestVersion]
      const dl = dlRes.status === 'fulfilled' ? dlRes.value.data : null

      return {
        name: altName,
        description: latestData?.description || reg.description || '',
        version: latestVersion,
        license: latestData?.license || reg.license || null,
        weeklyDownloads: dl?.downloads ?? null,
      }
    }),
  )

  return {
    alternatives: results
      .map((r) => (r.status === 'fulfilled' ? r.value : null))
      .filter(Boolean),
  }
})
