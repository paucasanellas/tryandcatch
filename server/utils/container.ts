import { ContentArticleRepository } from '@@/server/contexts/article/infrastructure/ContentArticleRepository'
import { ContentCategoryRepository } from '@@/server/contexts/category/infrastructure/ContentCategoryRepository'
import { ContentChangelogRepository } from '@@/server/contexts/changelog/infrastructure/ContentChangelogRepository'
import { ArticleSearch } from '@@/server/contexts/article/application/ArticleSearch'
import { ArticleFind } from '@@/server/contexts/article/application/ArticleFind'
import { CategoryFindAll } from '@@/server/contexts/category/application/CategoryFindAll'
import { CategoryFind } from '@@/server/contexts/category/application/CategoryFind'
import { ChangelogSearch } from '@@/server/contexts/changelog/application/ChangelogSearch'

export const useContainer = (event: ServerEvent) => {
  const categoryRepository = new ContentCategoryRepository(event)
  const articleRepository = new ContentArticleRepository(event, categoryRepository)
  const changelogRepository = new ContentChangelogRepository(event)

  const categoryFindAll = new CategoryFindAll(categoryRepository)
  const categoryFind = new CategoryFind(categoryRepository)
  const articleSearch = new ArticleSearch(articleRepository)
  const articleFind = new ArticleFind(articleRepository)
  const changelogSearch = new ChangelogSearch(changelogRepository)

  return {
    categoryFind,
    categoryFindAll,
    articleSearch,
    articleFind,
    changelogSearch,
  }
}
