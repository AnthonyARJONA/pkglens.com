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
      dependencies: parsed.dependencies || {},
      devDependencies: parsed.devDependencies || {},
    }
  } catch {
    return null
  }
}
