import type { ArticleRepository } from '@@/server/contexts/article/domain/ArticleRepository'
import type { ArticleSearchCriteria } from '@@/server/contexts/article/domain/Article'

export class ArticleSearch {
  constructor(readonly repository: ArticleRepository) {}

  async handle(criteria: ArticleSearchCriteria) {
    return this.repository.search(criteria)
  }
}
