import { defineCollection, defineContentConfig } from '@nuxt/content'

import { article } from './shared/schemas/articles'
import { home } from './shared/schemas/home'
import { releases } from './shared/schemas/releases'

export default defineContentConfig({
  collections: {
    home_es: defineCollection({
      type: 'page',
      source: 'es/pages/home.yml',
      schema: home,
    }),
    releases_es: defineCollection({
      type: 'page',
      source: 'es/pages/releases.yml',
      schema: releases,
    }),
    articles_es: defineCollection({
      type: 'page',
      source: 'es/articles/*.md',
      schema: article,
    }),
  },
})
