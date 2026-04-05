export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === 0 || bytes == null) return '0 B'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' kB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function formatNumber(n: number | null | undefined): string {
  if (n == null) return '—'
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return n.toString()
}

export function timeAgo(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return days + ' days ago'
  if (days < 365) return Math.floor(days / 30) + ' months ago'
  return Math.floor(days / 365) + ' years ago'
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getPackageAbbr(name: string): string {
  return name.replace(/^@[^/]+\//, '').slice(0, 2)
}
