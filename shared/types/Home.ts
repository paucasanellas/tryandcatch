import { z } from 'zod'

export const HomeQuery = z.object({
  locale: z.string(),
})

export type Home = {
  featured?: Article
}

export type HomeResponse = ServerSingleResponse<Home>
