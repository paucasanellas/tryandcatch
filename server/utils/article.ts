import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'

export class ServerArticle {
  constructor(private readonly event: H3Event) {}

  async find(slug: string, locale: string): Promise<Article> {
    const path = this.getPath(slug, locale)
    const article = await queryCollection(this.event, 'articles').path(path).first()

    if (!article) {
      throw new ArticleNotFound(slug)
    }

    return article
  }

  private getPath(slug: string, locale: string) {
    return `/articles/${locale}/${slug}`
  }
}
