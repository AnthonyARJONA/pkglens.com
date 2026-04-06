const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

export function sanitizeDeps(obj: unknown): Record<string, string> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {}
  const result: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (!DANGEROUS_KEYS.has(k) && typeof v === 'string') {
      result[k] = v
    }
  }
  return result
}
