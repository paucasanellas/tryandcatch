import type { ArticleRepository } from '@@/server/contexts/article/domain/ArticleRepository'

export class ArticleSearch {
  constructor(readonly repository: ArticleRepository) {}

  async handle(query: ArticleCriteria) {
    return this.repository.search(query)
  }
}
