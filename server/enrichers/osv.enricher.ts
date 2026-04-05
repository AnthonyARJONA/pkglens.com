import { fetchSafe } from '../core/fetcher/safe-fetcher'

export interface OsvVuln {
  id: string
  summary: string
  details: string
  aliases: string[]
  published: string
  modified: string
  affected: Array<{
    ranges: Array<{
      type: string
      events: Array<{ introduced?: string; fixed?: string }>
    }>
  }>
  severity: Array<{ type: string; score: string }>
  database_specific: {
    severity: string
    cwe_ids?: string[]
  }
}

interface OsvResponse {
  vulns: OsvVuln[]
}

export async function fetchVulnerabilities(name: string, version: string) {
  return fetchSafe<OsvResponse>({
    source: 'osv-vulns',
    cacheKey: `${name}@${version}`,
    url: 'https://api.osv.dev/v1/query',
    method: 'POST',
    body: { package: { name, ecosystem: 'npm' }, version },
    fallback: { vulns: [] },
  })
}
