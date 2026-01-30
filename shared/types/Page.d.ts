export type PageHomeResponse = ServerSingleResponse<{
  featuredArticle?: Article
  latestArticles: Article[]
}>

export type PageArticlesSlug = ServerSingleResponse<{
  article: Article
}>
