import { z } from 'zod'

export const getReleasesQuery = z.object({
  locale: z.string().trim().min(1),
})

export const releases = z.object({
  title: z.string(),
  description: z.string(),
  content: z.object({
    hero: z.object({
      headline: z.string(),
      title: z.string(),
      description: z.string(),
      links: z.object({
        repository: z.object({
          label: z.string(),
        }),
      }),
    }),
  }),
})
