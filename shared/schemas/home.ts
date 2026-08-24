import { z } from 'zod'

export const getHomeQuery = z.object({
  locale: z.string().trim().min(1),
})

export const home = z.object({
  title: z.string(),
  description: z.string(),
  content: z.object({
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
  }),
})
