import type { EcosystemId } from './ecosystem.interface'
import { parsePackageJson } from '../../ecosystems/npm/npm-file.parser'
import { parseComposerJson } from '../../ecosystems/packagist/packagist-file.parser'

export interface DetectedFile {
  ecosystem: EcosystemId
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export function detectAndParse(content: string, filename: string | null): DetectedFile | null {
  // Try by filename first
  if (filename) {
    const lower = filename.toLowerCase()
    if (lower === 'package.json' || lower.endsWith('/package.json')) {
      const result = parsePackageJson(content)
      if (result) return result
    }
    if (lower === 'composer.json' || lower.endsWith('/composer.json')) {
      const result = parseComposerJson(content)
      if (result) return result
    }
  }

  // Try by structure detection
  try {
    const parsed = JSON.parse(content)

    // composer.json: has "require" with keys containing "/"
    if (parsed.require && typeof parsed.require === 'object') {
      const keys = Object.keys(parsed.require)
      const hasVendorSlash = keys.some((k) => k.includes('/') && k !== 'php')
      if (hasVendorSlash) {
        const result = parseComposerJson(content)
        if (result) return result
      }
    }

    // package.json: has "dependencies" or "devDependencies"
    if (parsed.dependencies || parsed.devDependencies) {
      const result = parsePackageJson(content)
      if (result) return result
    }
  } catch {
    // Not JSON — could be requirements.txt, Cargo.toml, go.mod in the future
  }

  return null
}
