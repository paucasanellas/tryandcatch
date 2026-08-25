import { z } from 'zod'

import { ARTICLE_CATEGORIES } from '../types/articles'

export const getArticleParams = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
})

export const getArticleQuery = z.object({
  locale: z.string().trim().min(1),
})

export const article = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  publishedAt: z.iso.date(),
  readingTime: z.number().int().positive(),
  author: z.literal('Pau Casanellas'),
  categories: z.array(z.enum(ARTICLE_CATEGORIES))
    .min(1)
    .refine(categories => new Set(categories).size === categories.length),
  image: z.object({
    src: z.string().trim().min(1),
    alt: z.string().trim().min(1),
  }),
  rawbody: z.string().trim().min(1),
})
