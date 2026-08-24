import type { HttpClient } from '~~/server/contexts/shared/domain/http/HttpClient'
import type { ReleaseRepository } from '~~/server/contexts/releases/domain/ReleaseRepository'
import type { GithubReleasesResponse } from '~~/server/contexts/releases/infrastructure/GithubRelease'

import { InvalidReleaseError } from '~~/server/contexts/releases/domain/ReleaseErrors'
import { GithubReleaseMapper } from '~~/server/contexts/releases/infrastructure/GithubReleaseMapper'

export class GithubReleaseRepository implements ReleaseRepository {
  private readonly mapper = new GithubReleaseMapper()

  constructor(
    private readonly httpClient: HttpClient,
    private readonly repositoryUrl: string,
  ) {}

  async search() {
    try {
      const releases = await this.request()

      return releases
        .map(release => this.mapper.toDomain(release, this.repositoryUrl))
        .filter(release => !release.draft)
        .sort((current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt))
    }
    catch {
      throw new InvalidReleaseError('Releases could not be retrieved')
    }
  }

  private async request() {
    const { releases } = await this.httpClient.request<GithubReleasesResponse>(this.buildReleasesUrl(), {
      method: 'GET',
    })

    return releases
  }

  private buildReleasesUrl() {
    const repository = this.repositoryUrl.replace('https://github.com/', 'https://ungh.cc/repos/')

    return `${repository}/releases`
  }
}
