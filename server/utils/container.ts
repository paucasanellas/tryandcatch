import { ContentArticleRepository } from '@@/server/contexts/article/infrastructure/ContentArticleRepository'
import { ArticleSearch } from '@@/server/contexts/article/application/ArticleSearch'
import { ArticleFind } from '@@/server/contexts/article/application/ArticleFind'
import { ContentCategoryRepository } from '@@/server/contexts/category/infrastructure/ContentCategoryRepository'
import { CategoryFindAll } from '@@/server/contexts/category/application/CategoryFindAll'

export const useContainer = (event: ServerEvent) => {
  const categoryRepository = new ContentCategoryRepository(event)
  const articleRepository = new ContentArticleRepository(event, categoryRepository)

  const categoryFindAll = new CategoryFindAll(categoryRepository)
  const articleSearch = new ArticleSearch(articleRepository)
  const articleFind = new ArticleFind(articleRepository)

  return {
    categoryFindAll,
    articleSearch,
    articleFind,
  }
}
