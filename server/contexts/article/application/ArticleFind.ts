import type { ArticleRepository } from '@@/server/contexts/article/domain/ArticleRepository'
import type { ArticleFindCriteria } from '@@/server/contexts/article/domain/Article'
import { ArticleNotFoundError } from '@@/server/contexts/article/domain/ArticleError'

export class ArticleFind {
  constructor(readonly repository: ArticleRepository) {}

  async handle(criteria: ArticleFindCriteria) {
    const article = await this.repository.find(criteria)

    if (!article) {
      throw new ArticleNotFoundError(criteria.slug)
    }

    return article
  }
}
