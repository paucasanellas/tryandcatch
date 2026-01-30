import type { MarkdownRoot } from '@nuxt/content'

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
