export interface BundleData {
  size: number
  gzip: number
  dependencySizes: readonly { name: string; approximateSize: number }[]
  installSize: number | null
  installTime: number | null
}

export interface DownloadsData {
  weekly: number
  sparkline: readonly number[]
}
