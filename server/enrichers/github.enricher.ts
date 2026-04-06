import { fetchSafe } from '../core/fetcher/safe-fetcher'

export interface GithubRepoData {
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  subscribers_count: number
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface GithubRelease {
  tag_name: string
  name: string
  body: string
  published_at: string
  prerelease: boolean
  draft: boolean
}

export function extractGithubRepo(repoField: { type: string; url: string } | string | null | undefined): string | null {
  if (!repoField) return null
  const url = typeof repoField === 'string' ? repoField : (repoField?.url || '')
  const match = url.match(/github\.com[/:]([^/]+\/[^/.]+)/)
  if (!match) return null
  const repo = match[1]!.replace(/\.git$/, '')
  if (!/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/.test(repo)) return null
  return repo
}

export async function fetchGithubRepo(repo: string) {
  const token = useRuntimeConfig().githubToken
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetchSafe<GithubRepoData>({
    source: 'github-repo',
    cacheKey: repo,
    url: `https://api.github.com/repos/${repo}`,
    headers,
  })
}

export async function fetchGithubReleases(repo: string) {
  const token = useRuntimeConfig().githubToken
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetchSafe<GithubRelease[]>({
    source: 'github-releases',
    cacheKey: repo,
    url: `https://api.github.com/repos/${repo}/releases?per_page=30`,
    headers,
    fallback: [],
  })
}
