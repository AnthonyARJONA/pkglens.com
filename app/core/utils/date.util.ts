import { MS_PER_DAY } from '../constants'

export function daysSinceDate(dateStr: string | null | undefined): number {
  if (!dateStr) return Infinity
  return (Date.now() - new Date(dateStr).getTime()) / MS_PER_DAY
}
