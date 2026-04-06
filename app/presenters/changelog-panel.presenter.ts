import type { PackageData } from '~/core/package/package.types'
import { getVersionTag } from '~/core/package/package.decision'
import { renderMarkdown } from '~/core/utils/markdown.util'
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
