import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles_es: defineCollection({
      type: 'page',
      source: 'es/**/*.md',
    }),
  },
})
