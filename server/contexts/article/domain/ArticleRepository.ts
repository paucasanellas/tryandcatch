import type { ArticleFindCriteria, ArticleSearchCriteria } from '@@/server/contexts/article/domain/Article'

export interface ArticleRepository {
  search(criteria: ArticleSearchCriteria): Promise<Article[]>
  find(criteria: ArticleFindCriteria): Promise<Article | undefined>
}
