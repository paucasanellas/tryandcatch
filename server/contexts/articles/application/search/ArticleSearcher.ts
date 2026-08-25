import type { SearchArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'
import type { ArticleRepository } from '~~/server/contexts/articles/domain/ArticleRepository'

export class ArticleSearcher {
  constructor(private readonly repository: ArticleRepository) {}

  search(criteria: SearchArticleCriteria) {
    return this.repository.search(criteria)
  }
}
