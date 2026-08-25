export const ARTICLE_CATEGORIES = ['producto', 'frontend'] as const

export type ArticleCategory = typeof ARTICLE_CATEGORIES[number]

export type ArticleImage = {
  src: string
  alt: string
}

export type Article = {
  title: string
  description: string
  publishedAt: string
  readingTime: number
  author: string
  categories: ArticleCategory[]
  image: ArticleImage
  content: string
}

export type GetArticleResponse = {
  article: Article
}
