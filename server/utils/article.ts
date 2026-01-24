import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'

export class ServerArticle {
  constructor(private readonly event: H3Event) { }

  async search(query: ArticleSearchQuery) {
    return this.searchCriteria(query).all()
  }

  private searchCriteria(query: ArticleSearchQuery) {
    let queryCriteria = queryCollection(this.event, 'articles')

    for (const [key, value] of Object.entries(query)) {
      queryCriteria = queryCriteria.where(key, '=', value)
    }

    return queryCriteria
  }
}
