import { z } from '@nuxt/content'

export const releases = z.object({
  title: z.string(),
  description: z.string(),
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
})
