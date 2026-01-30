import { z } from 'zod'

export const PageHomeQuery = z.object({
  locale: z.string(),
})

export const ArticleSlugParams = z.object({
  slug: z.string(),
})

export const ArticleSlugQuery = z.object({
  locale: z.string(),
})

export const CategoriesSlugParams = z.object({
  slug: z.string(),
})

export const CategoriesSlugQuery = z.object({
  locale: z.string(),
})
