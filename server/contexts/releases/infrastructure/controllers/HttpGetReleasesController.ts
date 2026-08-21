import { createError } from 'h3'
import type { Release as DomainRelease } from '#server/contexts/releases/domain/Release'
import { ReleaseSearchError } from '#server/contexts/releases/domain/ReleaseErrors'
import type { ReleaseSearcher } from '#server/contexts/releases/application/search/ReleaseSearcher'

export class HttpGetReleasesController {
  constructor(private readonly releaseSearcher: ReleaseSearcher) {}

  async run(): Promise<GetReleasesResponse> {
    try {
      const releases = await this.releaseSearcher.search()

      return {
        releases: releases.map(release => this.toResponse(release)),
      }
    }
    catch (error) {
      if (error instanceof ReleaseSearchError) {
        throw createError({
          statusCode: 502,
          statusMessage: 'Releases unavailable',
          data: {
            code: 'RELEASES_UNAVAILABLE',
          },
        })
      }

      throw error
    }
  }

  private toResponse(release: DomainRelease): Release {
    return {
      tag: release.tag,
      title: release.title,
      publishedAt: release.publishedAt,
      content: release.content,
      url: release.url,
      compareUrl: release.compareUrl,
      prerelease: release.prerelease,
    }
  }
}
