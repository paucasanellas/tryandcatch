import type { RuntimeConfig } from 'nuxt/schema'
import { NitroFetchHttpClient } from '~~/server/contexts/shared/infrastructure/http/NitroFetchHttpClient'

import { ContentArticleRepository } from '~~/server/contexts/articles/infrastructure/ContentArticleRepository'
import { ContentPageRepository } from '~~/server/contexts/pages/infrastructure/ContentPageRepository'
import { GithubReleaseRepository } from '~~/server/contexts/releases/infrastructure/GithubReleaseRepository'

import { ArticleFinder } from '~~/server/contexts/articles/application/find/ArticleFinder'
import { ArticleSearcher } from '~~/server/contexts/articles/application/search/ArticleSearcher'
import { PageFinder } from '~~/server/contexts/pages/application/find/PageFinder'
import { ReleaseSearcher } from '~~/server/contexts/releases/application/search/ReleaseSearcher'

export function createServerContainer(config: RuntimeConfig) {
  // Clients
  const httpClient = new NitroFetchHttpClient()

  // Repositories
  const articleRepository = new ContentArticleRepository()
  const pageRepository = new ContentPageRepository()
  const releaseRepository = new GithubReleaseRepository(httpClient, config.public.repository.url)

  // Use cases
  const articleFinder = new ArticleFinder(articleRepository)
  const articleSearcher = new ArticleSearcher(articleRepository)
  const pageFinder = new PageFinder(pageRepository)
  const releaseSearcher = new ReleaseSearcher(releaseRepository)

  return {
    articleFinder,
    articleSearcher,
    pageFinder,
    releaseSearcher,
  }
}

export type ServerContainer = ReturnType<typeof createServerContainer>
