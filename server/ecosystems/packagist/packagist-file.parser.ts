import { sanitizeDeps } from '../../utils/safe-deps'

export interface ParsedDependencies {
  ecosystem: 'packagist'
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

function isPackageDep(key: string): boolean {
  return key.includes('/') && !key.startsWith('ext-') && key !== 'php' && !key.startsWith('lib-')
}

export function parseComposerJson(content: string): ParsedDependencies | null {
  try {
    const parsed = JSON.parse(content)
    if (!parsed.require && !parsed['require-dev']) return null

    const sanitizedRequire = sanitizeDeps(parsed.require)
    const sanitizedRequireDev = sanitizeDeps(parsed['require-dev'])
    const dependencies: Record<string, string> = {}
    const devDependencies: Record<string, string> = {}

    for (const [key, val] of Object.entries(sanitizedRequire)) {
      if (isPackageDep(key)) dependencies[key] = val
    }

    for (const [key, val] of Object.entries(sanitizedRequireDev)) {
      if (isPackageDep(key)) devDependencies[key] = val
    }

    return { ecosystem: 'packagist', dependencies, devDependencies }
  } catch {
    return null
  }
}
