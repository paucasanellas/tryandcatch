export const ARTICLE_CATEGORIES = ['producto', 'frontend'] as const

export type ArticleCategory = typeof ARTICLE_CATEGORIES[number]

export type ArticleImage = {
  src: string
  alt: string
}

export type Article = {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: number
  author: string
  categories: ArticleCategory[]
  image: ArticleImage
  content: string
}

export type ArticleSummary = {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: number
  author: string
  categories: ArticleCategory[]
  image: ArticleImage
}

export type ArticlesListHero = {
  headline: string
  title: string
  description: string
}

export type ArticlesContent = {
  hero: ArticlesListHero
}

export type GetArticlesResponse = {
  page: PageResponse<ArticlesContent>
  articles: ArticleSummary[]
}

export type GetArticleResponse = {
  article: Article
}

export type ArticlesStatus = 'idle' | 'pending' | 'success' | 'error'
