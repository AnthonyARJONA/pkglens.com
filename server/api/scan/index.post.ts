import { detectAndParse } from '../../core/ecosystems/file-detector'
import { fetchDepsVulnerabilities } from '../../enrichers/osv-batch.enricher'

const ECOSYSTEM_OSV_MAP: Record<string, string> = {
  npm: 'npm',
  packagist: 'Packagist',
  pypi: 'PyPI',
  cargo: 'crates.io',
  go: 'Go',
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ content: string; filename: string | null; dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(event)

  if (!body?.content && !body?.dependencies) {
    throw createError({ statusCode: 400, statusMessage: 'File content is required' })
  }

  // Handle both formats: { content, filename } and legacy { dependencies, devDependencies }
  let contentStr: string
  if (body.content) {
    contentStr = typeof body.content === 'string' ? body.content : JSON.stringify(body.content)
  } else {
    // Legacy format: direct dependencies object
    contentStr = JSON.stringify({ dependencies: body.dependencies, devDependencies: body.devDependencies || {} })
  }

  const detected = detectAndParse(contentStr, body.filename)
  if (!detected) {
    throw createError({ statusCode: 400, statusMessage: 'No dependencies found in this file. Make sure it contains dependencies (package.json) or require (composer.json).' })
  }

  const osvEcosystem = ECOSYSTEM_OSV_MAP[detected.ecosystem] || detected.ecosystem

  const [depsVulns, devDepsVulns] = await Promise.all([
    fetchDepsVulnerabilities(detected.dependencies, osvEcosystem),
    Object.keys(detected.devDependencies).length > 0
      ? fetchDepsVulnerabilities(detected.devDependencies, osvEcosystem)
      : Promise.resolve([]),
  ])

  const totalPackages = Object.keys(detected.dependencies).length + Object.keys(detected.devDependencies).length
  const totalVulns = [...depsVulns, ...devDepsVulns].reduce((s, d) => s + d.vulnCount, 0)
  const affectedPackages = depsVulns.length + devDepsVulns.length

  return {
    ecosystem: detected.ecosystem,
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
