import { createError } from 'h3'
import { ReleaseSearchError } from '#server/contexts/releases/domain/ReleaseErrors'

export default defineCachedEventHandler(async () => {
  const { container } = useNitroApp()

  try {
    const releases = await container.releaseSearcher.search()

    return {
      releases,
    }
  }
  catch (error) {
    if (error instanceof ReleaseSearchError) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Releases unavailable',
        data: {
          code: 'RELEASES_UNAVAILABLE',
        },
      })
    }

    throw error
  }
}, {
  maxAge: 900,
  swr: true,
})
