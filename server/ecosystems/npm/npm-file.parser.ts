import { sanitizeDeps } from '../../utils/safe-deps'

export interface ParsedDependencies {
  ecosystem: 'npm'
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export function parsePackageJson(content: string): ParsedDependencies | null {
  try {
    const parsed = JSON.parse(content)
    if (!parsed.dependencies && !parsed.devDependencies) return null

    return {
      ecosystem: 'npm',
      dependencies: sanitizeDeps(parsed.dependencies),
      devDependencies: sanitizeDeps(parsed.devDependencies),
    }
  } catch {
    return null
  }
}
