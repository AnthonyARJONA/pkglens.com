export function detectModuleSystem(pkg: { type?: string; module?: string; exports?: unknown }): 'esm' | 'cjs' | 'dual' {
  const isEsm = pkg.type === 'module'
  const hasModuleField = !!pkg.module
  const hasExports = !!pkg.exports

  if (isEsm) return 'esm'
  if (hasModuleField || hasExports) return 'dual'
  return 'cjs'
}
