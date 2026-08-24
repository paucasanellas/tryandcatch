export type GithubReleaseResponse = {
  tag: string
  name?: string | null
  draft: boolean
  prerelease: boolean
  publishedAt: string
  markdown: string
}

export type GithubReleasesResponse = {
  releases: GithubReleaseResponse[]
}
