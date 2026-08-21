export type ReleasesHero = {
  headline: string
  title: string
  description: string
  links: {
    repository: {
      label: string
    }
  }
}

export type ReleasesApiRelease = {
  tag: string
  name?: string
  draft: boolean
  prerelease: boolean
  publishedAt: string
  markdown: string
}

export type ReleasesApiResponse = {
  releases: ReleasesApiRelease[]
}

export type ReleaseVersion = {
  tag: string
  title: string
  date: string
  markdown: string
  url: string
  compareUrl?: string
}

export type ReleasesStatus = 'idle' | 'pending' | 'success' | 'error'
