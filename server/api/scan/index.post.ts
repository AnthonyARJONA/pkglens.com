import { fetchDepsVulnerabilities } from '../../enrichers/osv-batch.enricher'

interface ScanRequest {
  dependencies: Record<string, string>
  devDependencies?: Record<string, string>
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ScanRequest>(event)

  if (!body?.dependencies || typeof body.dependencies !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid package.json: missing dependencies' })
  }

  const deps = body.dependencies
  const devDeps = body.devDependencies || {}

  const [depsVulns, devDepsVulns] = await Promise.all([
    fetchDepsVulnerabilities(deps),
    Object.keys(devDeps).length > 0 ? fetchDepsVulnerabilities(devDeps) : Promise.resolve([]),
  ])

  const totalPackages = Object.keys(deps).length + Object.keys(devDeps).length
  const totalVulns = [...depsVulns, ...devDepsVulns].reduce((s, d) => s + d.vulnCount, 0)
  const affectedPackages = depsVulns.length + devDepsVulns.length

  return {
    summary: {
      totalPackages,
      totalVulns,
      affectedPackages,
      cleanPackages: totalPackages - affectedPackages,
    },
    dependencies: depsVulns,
    devDependencies: devDepsVulns,
  }
})
