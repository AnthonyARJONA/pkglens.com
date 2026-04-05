import alternativesData from './alternatives.json'

const CURATED_ALTERNATIVES: Record<string, string[]> = alternativesData

export function getCuratedAlternatives(name: string): string[] | null {
  return CURATED_ALTERNATIVES[name] || null
}
