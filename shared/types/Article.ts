import type { MarkdownRoot } from '@nuxt/content'
import { z } from 'zod'

export class ArticleNotFound extends NotFoundError {
  constructor(slug: string) {
    super(`Article not found: ${slug}`)
    this.name = 'ArticleNotFound'
  }
}

export const ArticleSlugParams = z.object({
  slug: z.string(),
})

export const ArticleSlugQuery = z.object({
  locale: z.string(),
})

export type ArticleCriteria = {
  locale: string
  featured?: boolean
  slug?: string
}

export type Article = {
  title: string
  description: string
  slug: string
  cover: string
  category?: Category
  locale: string
  featured?: boolean
  date: string
  readTime: number
  body: MarkdownRoot
}

export type ArticleSlugResponse = ServerSingleResponse<Article>
