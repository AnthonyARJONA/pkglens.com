export interface VulnData {
  id: string
  summary: string
  details: string
  aliases: readonly string[]
  published: string
  modified: string
  affected: readonly {
    ranges: readonly {
      type: string
      events: readonly { introduced?: string; fixed?: string }[]
    }[]
  }[]
  severity: readonly { type: string; score: string }[]
  database_specific: {
    severity: string
    cwe_ids?: readonly string[]
  }
}

export interface DepVulnResult {
  name: string
  version: string
  vulnCount: number
  vulns: readonly {
    id: string
    summary: string
    severity: string
    cve: string
  }[]
}
