import type { PackageData } from '~/core/package/package.types'
import { getVersionTag } from '~/core/package/package.decision'
import { formatDate } from './package.presenter'

export interface ChangelogEntryViewModel {
  version: string
  date: string
  tagLabel: string | null
  tagColorClass: string | null
  releaseBodyHtml: string | null
  isMajor: boolean
}

export interface ChangelogPanelViewModel {
  stable: ChangelogEntryViewModel[]
  majors: ChangelogEntryViewModel[]
  all: ChangelogEntryViewModel[]
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^# (.+)$/gm, '<h3>$1</h3>')

  // Bold / italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // List items
  html = html.replace(/^[*-] (.+)$/gm, '<li>$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Paragraphs (double newlines)
  html = html.replace(/\n\n+/g, '</p><p>')
  html = '<p>' + html + '</p>'

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/<p>\s*(<[hul])/g, '$1')
  html = html.replace(/(<\/[hul][^>]*>)\s*<\/p>/g, '$1')

  // Single newlines to <br> inside <p>
  html = html.replace(/([^>])\n([^<])/g, '$1<br>$2')

  return html
}

export function presentChangelogPanel(data: PackageData): ChangelogPanelViewModel {
  const releaseMap: Record<string, string> = {}
  for (const r of data.releases) {
    releaseMap[r.tag] = r.body
    if (r.tag.startsWith('v')) releaseMap[r.tag.slice(1)] = r.body
    else releaseMap['v' + r.tag] = r.body
  }

  function mapEntry(v: { version: string; date: string | null }): ChangelogEntryViewModel {
    const tag = getVersionTag(v.version, data.registry.latestVersion)
    const rawBody = releaseMap[v.version] ?? null
    const match = v.version.match(/^(\d+)\.(\d+)\.(\d+)$/)
    const isMajor = match ? match[2] === '0' && match[3] === '0' : false

    return {
      version: v.version,
      date: formatDate(v.date),
      tagLabel: tag?.label ?? null,
      tagColorClass: tag ? 'tag-' + tag.color : null,
      releaseBodyHtml: rawBody ? renderMarkdown(rawBody) : null,
      isMajor,
    }
  }

  const stable = data.registry.versions.stable.slice(0, 50).map(mapEntry)
  const all = data.registry.versions.all.slice(0, 50).map(mapEntry)
  const majors = stable.filter((e) => e.isMajor)

  return { stable, majors, all }
}
