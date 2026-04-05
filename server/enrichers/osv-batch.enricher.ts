import { fetchSafe } from '../core/fetcher/safe-fetcher'

interface OsvBatchQuery {
  package: { name: string; ecosystem: string }
  version?: string
}

interface OsvBatchResponse {
  results: Array<{
    vulns: Array<{
      id: string
      summary: string
      aliases: string[]
      database_specific: { severity: string }
    }>
  }>
}

export interface DepVulnResult {
  name: string
  version: string
  vulnCount: number
  vulns: Array<{
    id: string
    summary: string
    severity: string
    cve: string
  }>
}

function stripSemverPrefix(range: string): string {
  return range.replace(/^[\^~>=<\s]+/, '').split(' ')[0] ?? range
}

export async function fetchDepsVulnerabilities(
  deps: Record<string, string>,
  ecosystem: string = 'npm',
): Promise<DepVulnResult[]> {
  const entries = Object.entries(deps)
  if (entries.length === 0) return []

  const queries: OsvBatchQuery[] = entries.map(([name, range]) => ({
    package: { name, ecosystem },
    version: stripSemverPrefix(range),
  }))

  const cacheKey = entries.map(([n, v]) => `${n}@${stripSemverPrefix(v)}`).sort().join(',')

  const result = await fetchSafe<OsvBatchResponse>({
    source: 'osv-vulns',
    cacheKey: `batch:${hashString(cacheKey)}`,
    url: 'https://api.osv.dev/v1/querybatch',
    method: 'POST',
    body: { queries },
    fallback: { results: [] },
  })

  if (!result.data?.results) return []

  const output: DepVulnResult[] = []
  for (let i = 0; i < entries.length; i++) {
    const [name, range] = entries[i]!
    const vulns = result.data.results[i]?.vulns || []
    if (vulns.length > 0) {
      output.push({
        name,
        version: stripSemverPrefix(range),
        vulnCount: vulns.length,
        vulns: vulns.slice(0, 3).map((v) => ({
          id: v.id,
          summary: v.summary || '',
          severity: (v.database_specific?.severity || 'medium').toLowerCase(),
          cve: v.aliases?.find((a: string) => a.startsWith('CVE')) || v.id,
        })),
      })
    }
  }

  return output
}

function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}
