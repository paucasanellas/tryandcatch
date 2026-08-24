import { Release } from '~~/server/contexts/releases/domain/Release'
import type { GithubReleaseResponse } from '~~/server/contexts/releases/infrastructure/GithubRelease'

export class GithubReleaseMapper {
  toDomain(response: GithubReleaseResponse, repositoryUrl: string) {
    const { content, compareUrl } = this.parseMarkdown(response.markdown)

    return Release.create({
      tag: response.tag,
      title: response.name?.trim() || response.tag,
      publishedAt: response.publishedAt,
      content,
      url: `${repositoryUrl}/releases/tag/${encodeURIComponent(response.tag)}`,
      compareUrl,
      draft: response.draft,
      prerelease: response.prerelease,
    })
  }

  private parseMarkdown(markdown: string) {
    const [heading = '', ...body] = markdown.split('\n')
    const compareUrl = heading.match(/\]\((https:\/\/github\.com\/[^)]+\/compare\/[^)]+)\)/)?.[1] ?? null
    const content = heading.startsWith('## ')
      ? body.join('\n').trim()
      : markdown

    return {
      content,
      compareUrl,
    }
  }
}
