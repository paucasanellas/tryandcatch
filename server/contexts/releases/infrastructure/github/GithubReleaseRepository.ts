import type { HttpClient } from '#server/contexts/shared/domain/http/HttpClient'
import type { Release } from '#server/contexts/releases/domain/Release'
import type { ReleaseRepository } from '#server/contexts/releases/domain/ReleaseRepository'
import { InvalidReleaseDataError, ReleaseSearchError } from '#server/contexts/releases/domain/ReleaseErrors'
import { GithubRelease, type GithubReleasesResponse } from '#server/contexts/releases/infrastructure/github/GithubRelease'

export class GithubReleaseRepository implements ReleaseRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly repositoryUrl: string,
  ) {}

  async search(): Promise<Release[]> {
    try {
      const url = this.releasesUrl()
      const response = await this.httpClient.request<GithubReleasesResponse>(url, {
        method: 'GET',
      })

      if (!Array.isArray(response.releases)) {
        throw new InvalidReleaseDataError()
      }

      return response.releases
        .map(release => GithubRelease.fromResponse(release).toDomain(this.repositoryUrl))
        .filter(release => !release.draft)
        .sort((current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt))
    }
    catch (error) {
      throw new ReleaseSearchError({ cause: error })
    }
  }

  private releasesUrl(): string {
    const repository = new URL(this.repositoryUrl)
    const path = repository.pathname.split('/').filter(Boolean)

    if (repository.hostname !== 'github.com' || path.length !== 2) {
      throw new InvalidReleaseDataError()
    }

    return `https://ungh.cc/repos/${path.join('/')}/releases`
  }
}
