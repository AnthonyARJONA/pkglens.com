export interface GithubData {
  stars: number
  forks: number
  openIssues: number
  pushedAt: string
  repo: string
}

export interface ReleaseData {
  tag: string
  body: string
  publishedAt: string
}
