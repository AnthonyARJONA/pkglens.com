import type { PackageData } from '~/core/package/package.types'
import { formatBytes } from './package.presenter'

export interface BundleStoryItem {
  name: string
  sizeLabel: string
  percent: number
  percentLabel: string
  color: string
}

export interface TreeShakeViewModel {
  label: string
  description: string
  isShakeable: boolean
}

export interface LoadingImpactItem {
  value: string
  label: string
}

export interface BundlePanelViewModel {
  hasData: boolean
  emptyMessage: string | null
  headerLabel: string
  items: BundleStoryItem[]
  smallDepsLabel: string | null
  treeShake: TreeShakeViewModel | null
  loadingImpact: LoadingImpactItem[]
}

const SMALL_THRESHOLD = 5000

export function presentBundlePanel(data: PackageData): BundlePanelViewModel {
  const bundle = data.bundle

  if (!bundle) {
    return {
      hasData: false,
      emptyMessage: 'Bundle data is not yet available for this package. Bundlephobia may still be processing it — try again in a few minutes.',
      headerLabel: '',
      items: [],
      smallDepsLabel: null,
      treeShake: null,
      loadingImpact: [],
    }
  }

  const sorted = [...bundle.dependencySizes]
    .sort((a, b) => b.approximateSize - a.approximateSize)

  const bigDeps = sorted.filter((d) => d.approximateSize >= SMALL_THRESHOLD)
  const smallDeps = sorted.filter((d) => d.approximateSize < SMALL_THRESHOLD)

  const items: BundleStoryItem[] = bigDeps.map((d) => {
    const pct = Math.round((d.approximateSize / (bundle.size || 1)) * 100)
    return {
      name: d.name,
      sizeLabel: formatBytes(d.approximateSize),
      percent: pct,
      percentLabel: pct + '%',
      color: pct > 40 ? 'var(--accent)' : pct > 15 ? 'var(--cyan)' : 'var(--purple)',
    }
  })

  const smallDepsLabel = smallDeps.length > 0
    ? `+ ${smallDeps.length} other module${smallDeps.length > 1 ? 's' : ''} under 5 kB (${formatBytes(smallDeps.reduce((s, d) => s + d.approximateSize, 0))} total)`
    : null

  const moduleSystem = data.registry.latest?.moduleSystem ?? 'cjs'
  const treeShake: TreeShakeViewModel = {
    label: moduleSystem === 'esm' ? 'ESM' : moduleSystem === 'dual' ? 'ESM + CJS' : 'CommonJS',
    description: moduleSystem === 'esm'
      ? 'Tree-shakeable — your bundler will only include what you import'
      : moduleSystem === 'dual'
        ? 'Supports tree-shaking when imported as ESM'
        : 'Not tree-shakeable — the full bundle is imported regardless of what you use',
    isShakeable: moduleSystem !== 'cjs',
  }

  const gzip = bundle.gzip || bundle.size
  const loadingImpact: LoadingImpactItem[] = [
    { value: formatLoadTime(gzip, 400), label: 'Slow 3G' },
    { value: formatLoadTime(gzip, 10000), label: '4G' },
  ]

  return {
    hasData: true,
    emptyMessage: null,
    headerLabel: `${formatBytes(bundle.size)} minified · ${formatBytes(bundle.gzip)} gzipped`,
    items,
    smallDepsLabel,
    treeShake,
    loadingImpact,
  }
}

function formatLoadTime(bytes: number, kbps: number): string {
  const seconds = (bytes * 8) / (kbps * 1000)
  if (seconds < 0.01) return '<10ms'
  if (seconds < 1) return Math.round(seconds * 1000) + 'ms'
  return seconds.toFixed(1) + 's'
}
