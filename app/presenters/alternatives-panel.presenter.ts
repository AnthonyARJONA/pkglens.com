import type { AlternativeInfo } from '~/composables/use-alternatives-flow'
import { formatNumber } from './package.presenter'

export interface AlternativeViewModel {
  name: string
  description: string
  version: string
  weeklyDownloads: string
  license: string
}

export function presentAlternatives(alts: readonly AlternativeInfo[]): AlternativeViewModel[] {
  return alts.map((alt) => ({
    name: alt.name,
    description: alt.description.slice(0, 120),
    version: alt.version,
    weeklyDownloads: alt.weeklyDownloads ? formatNumber(alt.weeklyDownloads) : '—',
    license: alt.license || '—',
  }))
}
