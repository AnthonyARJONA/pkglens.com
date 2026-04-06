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

  // Validate dependencies/devDependencies are plain objects with string values
  if (body.dependencies != null) {
    if (typeof body.dependencies !== 'object' || Array.isArray(body.dependencies)) {
      throw createError({ statusCode: 400, statusMessage: 'dependencies must be an object' })
    }
    if (!Object.values(body.dependencies).every((v) => typeof v === 'string')) {
      throw createError({ statusCode: 400, statusMessage: 'All dependency values must be strings' })
    }
  }
  if (body.devDependencies != null) {
    if (typeof body.devDependencies !== 'object' || Array.isArray(body.devDependencies)) {
      throw createError({ statusCode: 400, statusMessage: 'devDependencies must be an object' })
    }
    if (!Object.values(body.devDependencies).every((v) => typeof v === 'string')) {
      throw createError({ statusCode: 400, statusMessage: 'All devDependency values must be strings' })
    }
  }

  // Validate content type
  if (body.content && typeof body.content !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Content must be a string' })
  }

  // Validate content size (max 500KB)
  if (body.content && body.content.length > 500_000) {
    throw createError({ statusCode: 400, statusMessage: 'Content exceeds maximum size of 500KB' })
  }

  // Validate filename if provided
  if (body.filename && !body.filename.endsWith('.json')) {
    throw createError({ statusCode: 400, statusMessage: 'Only .json files are supported' })
  }

  // Validate dependency count limits
  if (body.dependencies && Object.keys(body.dependencies).length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Too many dependencies (max 200)' })
  }
  if (body.devDependencies && Object.keys(body.devDependencies).length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Too many devDependencies (max 200)' })
  }

  // Handle both formats: { content, filename } and legacy { dependencies, devDependencies }
  let contentStr: string
  if (body.content) {
    contentStr = body.content
  } else {
    // Legacy format: direct dependencies object
    contentStr = JSON.stringify({ dependencies: body.dependencies, devDependencies: body.devDependencies || {} })
  }

  const detected = detectAndParse(contentStr, body.filename)
  if (!detected) {
    throw createError({ statusCode: 400, statusMessage: 'No dependencies found in this file. Make sure it contains dependencies (package.json) or require (composer.json).' })
  }

  // Validate parsed dependency count
  if (Object.keys(detected.dependencies).length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Too many dependencies (max 200)' })
  }
  if (Object.keys(detected.devDependencies).length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Too many devDependencies (max 200)' })
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
  const affected = depsVulns.length + devDepsVulns.length
  return {
    ecosystem: detected.ecosystem,
    summary: { totalPackages, totalVulns, affectedPackages: affected, cleanPackages: totalPackages - affected },
    dependencies: depsVulns,
    devDependencies: devDepsVulns,
  }
})
