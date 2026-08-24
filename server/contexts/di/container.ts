import type { RuntimeConfig } from 'nuxt/schema'
import { PageFinder } from '~~/server/contexts/pages/application/find/PageFinder'
import { ContentPageRepository } from '~~/server/contexts/pages/infrastructure/ContentPageRepository'
import { ReleaseSearcher } from '~~/server/contexts/releases/application/search/ReleaseSearcher'
import { GithubReleaseRepository } from '~~/server/contexts/releases/infrastructure/GithubReleaseRepository'
import { NitroFetchHttpClient } from '~~/server/contexts/shared/infrastructure/http/NitroFetchHttpClient'

export function createServerContainer(config: RuntimeConfig) {
  // Clients
  const httpClient = new NitroFetchHttpClient()

  // Repositories
  const pageRepository = new ContentPageRepository()
  const releaseRepository = new GithubReleaseRepository(httpClient, config.public.repository.url)

  // Use cases
  const releaseSearcher = new ReleaseSearcher(releaseRepository)
  const pageFinder = new PageFinder(pageRepository)

  return {
    pageFinder,
    releaseSearcher,
  }
}

export type ServerContainer = ReturnType<typeof createServerContainer>
