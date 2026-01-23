import type { MarkdownRoot } from '@nuxt/content'
import { z } from 'zod'

export class ArticleNotFound extends NotFoundError {
  constructor(slug: string) {
    super(`Article not found: ${slug}`)
    this.name = 'ArticleNotFound'
  }
}

export const ArticleFindParams = z.object({
  slug: z.string(),
})

export const ArticleFindQuery = z.object({
  locale: z.string(),
})

export type Article = {
  title: string
  description: string
  date: string
  readTime: number
  body: MarkdownRoot
}

export type ArticleFindResponse = ServerSingleResponse<Article>
