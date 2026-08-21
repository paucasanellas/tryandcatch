import { Release } from '#server/contexts/releases/domain/Release'
import { InvalidReleaseDataError } from '#server/contexts/releases/domain/ReleaseErrors'

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

export class GithubRelease {
  private constructor(private readonly response: GithubReleaseResponse) {
    this.ensureReleaseIsValid()
  }

  static fromResponse(response: GithubReleaseResponse): GithubRelease {
    return new GithubRelease(response)
  }

  toDomain(repositoryUrl: string): Release {
    const { content, compareUrl } = this.parseMarkdown()

    return new Release(
      this.response.tag,
      this.response.name?.trim() || this.response.tag,
      this.response.publishedAt,
      content,
      `${repositoryUrl.replace(/\/$/, '')}/releases/tag/${encodeURIComponent(this.response.tag)}`,
      compareUrl,
      this.response.draft,
      this.response.prerelease,
    )
  }

  private ensureReleaseIsValid(): void {
    if (
      typeof this.response?.tag !== 'string'
      || (this.response.name !== undefined && this.response.name !== null && typeof this.response.name !== 'string')
      || typeof this.response.draft !== 'boolean'
      || typeof this.response.prerelease !== 'boolean'
      || typeof this.response.publishedAt !== 'string'
      || Number.isNaN(Date.parse(this.response.publishedAt))
      || typeof this.response.markdown !== 'string'
    ) {
      throw new InvalidReleaseDataError()
    }
  }

  private parseMarkdown(): { content: string, compareUrl: string | null } {
    const [heading = '', ...body] = this.response.markdown.split('\n')
    const compareUrl = heading.match(/\]\((https:\/\/github\.com\/[^)]+\/compare\/[^)]+)\)/)?.[1] ?? null
    const content = heading.startsWith('## ')
      ? body.join('\n').trim()
      : this.response.markdown

    return {
      content,
      compareUrl,
    }
  }
}
