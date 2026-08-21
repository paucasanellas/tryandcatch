export type ReleasesListHero = {
  headline: string
  title: string
  description: string
  links: {
    repository: {
      label: string
    }
  }
}

export type Release = {
  tag: string
  title: string
  publishedAt: string
  content: string
  url: string
  compareUrl: string | null
  prerelease: boolean
}

export type GetReleasesResponse = {
  releases: Release[]
}

export type ReleasesStatus = 'idle' | 'pending' | 'success' | 'error'
