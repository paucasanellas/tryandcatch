export type PageHomeResponse = ServerSingleResponse<{
  featuredArticle?: ArticleWithoutBody
  latestArticles: ArticleWithoutBody[]
}>

export type PageArticlesSlug = ServerSingleResponse<{
  article: Article
}>
