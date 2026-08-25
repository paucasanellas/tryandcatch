import type { FindArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'
import type { ArticleRepository } from '~~/server/contexts/articles/domain/ArticleRepository'

import { ArticleNotFoundError } from '~~/server/contexts/articles/domain/ArticleErrors'

export class ArticleFinder {
  constructor(private readonly repository: ArticleRepository) {}

  async find(criteria: FindArticleCriteria) {
    const article = await this.repository.find(criteria)

    if (!article) {
      throw new ArticleNotFoundError(criteria)
    }

    return article
  }
}
