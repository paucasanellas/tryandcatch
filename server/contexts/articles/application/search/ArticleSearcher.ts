import type { SearchArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'
import type { ArticleRepository } from '~~/server/contexts/articles/domain/ArticleRepository'

export class ArticleSearcher {
  constructor(private readonly repository: ArticleRepository) {}

  async search(criteria: SearchArticleCriteria) {
    const articles = await this.repository.search(criteria)

    return articles.map(article => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      author: article.author,
      categories: article.categories,
      image: article.image,
    }))
  }
}
