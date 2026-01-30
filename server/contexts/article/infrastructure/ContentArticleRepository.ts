import { queryCollection } from '@nuxt/content/server'
import type { ArticleFindCriteria, ArticleSearchCriteria } from '@@/server/contexts/article/domain/Article'
import type { ArticleRepository } from '@@/server/contexts/article/domain/ArticleRepository'
import type { ArticlesCollectionItem } from '@nuxt/content'
import type { CategoryRepository } from '@@/server/contexts/category/domain/CategoryRepository'

export class ContentArticleRepository implements ArticleRepository {
  constructor(
    private readonly event: ServerEvent,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async search(criteria: ArticleSearchCriteria) {
    const categories = await this.categoryRepository.all(criteria)

    const articles = await this.searchCriteria(criteria).all()

    return articles.map(article => this.articleToDomain(article, categories))
  }

  async find(criteria: ArticleFindCriteria) {
    const categories = await this.categoryRepository.all(criteria)

    const article = await queryCollection(this.event, 'articles')
      .where('locale', '=', criteria.locale)
      .where('slug', '=', criteria.slug)
      .first()

    if (article) {
      return this.articleToDomain(article, categories)
    }
  }

  private searchCriteria(criteria: ArticleSearchCriteria) {
    let queryCriteria = queryCollection(this.event, 'articles')

    for (const [key, value] of Object.entries(criteria)) {
      queryCriteria = queryCriteria.where(key, '=', value)
    }

    return queryCriteria
  }

  private articleToDomain(
    article: ArticlesCollectionItem,
    categories: Category[],
  ): Article {
    const category = categories.find(category => category.slug === article.category)

    return {
      title: article.title,
      slug: article.slug,
      description: article.description,
      body: article.body,
      cover: article.cover,
      featured: article.featured,
      date: article.date,
      locale: article.locale,
      readTime: article.readTime,
      category,
    }
  }
}
