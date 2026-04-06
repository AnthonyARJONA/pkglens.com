export function buildBundleResponse(
  bundleData: { size: number; gzip: number; dependencySizes: Array<{ name: string; approximateSize: number }>; installSize?: number; installTime?: number } | null,
  latestData: { dist?: { unpackedSize?: number } } | undefined,
) {
  if (bundleData) {
    return {
      size: bundleData.size,
      gzip: bundleData.gzip,
      dependencySizes: bundleData.dependencySizes || [],
      installSize: bundleData.installSize || null,
      installTime: bundleData.installTime || null,
    }
  }

  // Fallback: use npm registry unpackedSize
  const unpackedSize = latestData?.dist?.unpackedSize
  if (unpackedSize) {
    return {
      size: unpackedSize,
      gzip: Math.round(unpackedSize * 0.3), // rough estimate: gzip is ~30% of raw
      dependencySizes: [],
      installSize: null,
      installTime: null,
    }
  }

  return null
}
