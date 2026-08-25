import type { Article } from '~~/server/contexts/articles/domain/Article'
import type { FindArticleCriteria, SearchArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'

export interface ArticleRepository {
  find(criteria: FindArticleCriteria): Promise<Article | null>
  search(criteria: SearchArticleCriteria): Promise<Article[]>
}
