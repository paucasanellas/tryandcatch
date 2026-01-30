export type ArticleSearchCriteria = {
  locale: string
  featured?: boolean
  slug?: string
  category?: string
}

export type ArticleFindCriteria = {
  locale: string
  slug: string
}
