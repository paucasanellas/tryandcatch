import { z } from '@nuxt/content'

export const home = z.object({
  title: z.string(),
  description: z.string(),
})
