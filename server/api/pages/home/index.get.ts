import { getHomeQuery } from '~~/shared/schemas/home'

export default defineCachedEventHandler<Promise<GetHomeResponse>>(async (event) => {
  const { locale } = await getValidatedQuery(event, getHomeQuery.parse)
  const { pageFinder } = useServerContainer()

  try {
    const page = await pageFinder.find<PageResponse<HomeContent>>({
      locale,
      page: 'home',
    })

    return {
      page,
    }
  }
  catch (error) {
    throw handleError(error)
  }
}, pageCacheOptions)
