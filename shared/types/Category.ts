import z from 'zod'

export const CategoryGetSchema = z.object({
  locale: z.string(),
})

export type CategoryGetCriteria = z.infer<typeof CategoryGetSchema>

export type CategorySearchQuery = {
  name?: string
  slug?: string
  locale?: string
}

export type Category = {
  name: string
  slug: string
  locale: string
}
