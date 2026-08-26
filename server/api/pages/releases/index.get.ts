import { getReleasesQuery } from '~~/shared/schemas/releases'

export default defineCachedEventHandler<Promise<GetReleasesResponse>>(async (event) => {
  const { locale } = await getValidatedQuery(event, getReleasesQuery.parse)
  const { pageFinder, releaseSearcher } = useServerContainer()

  try {
    const page = await pageFinder.find<PageResponse<ReleasesContent>>({
      locale,
      page: 'releases',
    })

    const releases = await releaseSearcher.search()

    return {
      page,
      releases,
    }
  }
  catch (error) {
    throw handleError(error)
  }
}, pageCacheOptions)
