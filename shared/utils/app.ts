import { z } from 'zod'

export const AppQuery = z.object({
  locale: z.string(),
})
