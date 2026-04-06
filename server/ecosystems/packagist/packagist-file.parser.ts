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

    const dependencies: Record<string, string> = {}
    const devDependencies: Record<string, string> = {}

    for (const [key, val] of Object.entries(parsed.require || {})) {
      if (isPackageDep(key)) dependencies[key] = val as string
    }

    for (const [key, val] of Object.entries(parsed['require-dev'] || {})) {
      if (isPackageDep(key)) devDependencies[key] = val as string
    }

    return { ecosystem: 'packagist', dependencies, devDependencies }
  } catch {
    return null
  }
}
