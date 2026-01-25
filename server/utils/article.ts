import { queryCollection } from '@nuxt/content/server'

export class ServerArticle {
  constructor(private readonly event: ServerEvent) {}

  async search(query: ArticleSearchQuery) {
    const articles = await this.searchCriteria(query).all()
    const categories = await queryCollection(this.event, 'categories').all()

    return articles.map((article) => {
      const category = categories.find(category => category.slug === article.category)

      return {
        ...article,
        category,
      }
    })
  }

  private searchCriteria(query: ArticleSearchQuery) {
    let queryCriteria = queryCollection(this.event, 'articles')

    for (const [key, value] of Object.entries(query)) {
      queryCriteria = queryCriteria.where(key, '=', value)
    }

    return queryCriteria
  }
}
