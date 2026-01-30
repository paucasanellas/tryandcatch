import { z } from 'zod'

export const PageHomeQuery = z.object({
  locale: z.string(),
})

export type PageHomeResponse = ServerSingleResponse<{
  featuredArticle?: Article
  latestArticles: Article[]
}>
