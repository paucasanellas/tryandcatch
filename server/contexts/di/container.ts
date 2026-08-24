import type { RuntimeConfig } from 'nuxt/schema'
import { ReleaseSearcher } from '#server/contexts/releases/application/search/ReleaseSearcher'
import { GithubReleaseRepository } from '#server/contexts/releases/infrastructure/github/GithubReleaseRepository'
import { NitroFetchHttpClient } from '#server/contexts/shared/infrastructure/http/NitroFetchHttpClient'

export function createServerContainer(config: RuntimeConfig) {
  const httpClient = new NitroFetchHttpClient()
  const releaseRepository = new GithubReleaseRepository(
    httpClient,
    config.public.repository.url,
  )
  const releaseSearcher = new ReleaseSearcher(releaseRepository)

  return {
    releaseSearcher,
  }
}

export type ServerContainer = ReturnType<typeof createServerContainer>
