import type { ArticleRepository } from '@@/server/contexts/article/domain/ArticleRepository'
import { ArticleNotFoundError } from '@@/server/contexts/article/domain/ArticleError'

export class ArticleFind {
  constructor(readonly repository: ArticleRepository) {}

  async handle(query: ArticleCriteria) {
    const [article] = await this.repository.search(query)

    if (!article) {
      throw new ArticleNotFoundError()
    }

    return article
  }
}
