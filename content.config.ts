import type { CollectionSource } from '@nuxt/content'
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const repository: CollectionSource['repository'] = {
  url: process.env.NUXT_CONTENT_URL!,
  branch: process.env.NUXT_CONTENT_BRANCH,
  auth: {
    username: process.env.NUXT_CONTENT_USERNAME,
    token: process.env.NUXT_CONTENT_AUTH,
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
    changelog: defineCollection({
      type: 'page',
      source: {
        repository: repository.url ? repository : undefined,
        include: 'changelog/**/*.md',
      },
      schema: z.object({
        title: z.string(),
        locale: z.string(),
        date: z.date(),
        version: z.string(),
      }),
    }),
  },
})
