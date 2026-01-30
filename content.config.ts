import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const repository = {
  url: import.meta.env.NUXT_CONTENT_URL,
  branch: import.meta.env.NUXT_CONTENT_BRANCH,
  auth: {
    username: import.meta.env.NUXT_CONTENT_USERNAME,
    token: import.meta.env.NUXT_CONTENT_AUTH,
  },
}

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: {
        repository: repository.url ? repository : undefined,
        include: 'articles/**/*.md',
      },
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        locale: z.string(),
        cover: z.string().url(),
        category: z.string(),
        featured: z.boolean().default(false),
        description: z.string(),
        date: z.date(),
        readTime: z.number().min(1),
      }),
    }),
    categories: defineCollection({
      type: 'page',
      source: {
        repository: repository.url ? repository : undefined,
        include: 'categories/**/*.md',
      },
      schema: z.object({
        name: z.string(),
        description: z.string(),
        slug: z.string(),
        color: z.string(),
        locale: z.string(),
      }),
    }),
  },
})
