export function buildVersionSummary(reg: { versions?: Record<string, unknown>; versionsList?: string[]; time?: Record<string, string> }) {
  const all = (reg.versionsList || Object.keys(reg.versions || {})).reverse()
  const stable = all.filter((v) => /^\d+\.\d+\.\d+$/.test(v))
  return {
    total: all.length,
    stable: stable.slice(0, 25).map((v) => ({
      version: v,
      date: reg.time?.[v] || null,
    })),
    all: all.slice(0, 25).map((v) => ({
      version: v,
      date: reg.time?.[v] || null,
    })),
  }
}
