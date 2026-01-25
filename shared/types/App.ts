import { z } from 'zod'

export const AppGetQuery = z.object({
  locale: z.string(),
})

export type AppState = object
