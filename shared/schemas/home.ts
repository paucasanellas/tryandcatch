import { z } from '@nuxt/content'

export const home = z.object({
  title: z.string(),
  description: z.string(),
  hero: z.object({
    headline: z.string(),
    title: z.string(),
    titleAccent: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    links: z.object({
      articles: z.object({
        label: z.string(),
      }),
      repository: z.object({
        label: z.string(),
      }),
    }),
  }),
})
