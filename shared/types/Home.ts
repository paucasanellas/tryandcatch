import { z } from 'zod'

export const HomeQuery = z.object({
  locale: z.string(),
})

export type HomeResponse = {
  featured?: Article
  latests: Article[]
}
