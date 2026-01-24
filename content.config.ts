import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: {
        include: 'articles/**/*.md',
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        readTime: z.number().min(1),
      }),
    }),
  },
})
