const NPM_REGEX = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/
const PACKAGIST_REGEX = /^[a-z0-9]([_.-]?[a-z0-9]+)*\/[a-z0-9]([_.-]?[a-z0-9]+)*$/

const MAX_LENGTHS: Record<string, number> = {
  npm: 214,
  packagist: 256,
}

export function validatePackageName(name: string, ecosystem: string): string {
  const trimmed = name.trim()

  if (!trimmed) {
    throw createError({ statusCode: 400, statusMessage: 'Package name is required' })
  }

  const maxLen = MAX_LENGTHS[ecosystem] || 256
  if (trimmed.length > maxLen) {
    throw createError({ statusCode: 400, statusMessage: 'Package name exceeds max length' })
  }

  if (ecosystem === 'npm' && !NPM_REGEX.test(trimmed)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid npm package name' })
  }

  if (ecosystem === 'packagist' && !PACKAGIST_REGEX.test(trimmed)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid packagist package name (expected vendor/package)' })
  }

  return trimmed
}
