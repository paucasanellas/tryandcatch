import { getArticlesQuery } from '~~/shared/schemas/articles'

export default defineCachedEventHandler<Promise<GetArticlesResponse>>(async (event) => {
  const { locale } = await getValidatedQuery(event, query => getArticlesQuery.parse(query))
  const { articleSearcher, pageFinder } = useServerContainer()

  try {
    const page = await pageFinder.find<PageResponse<ArticlesContent>>({
      locale,
      page: 'articles_page',
    })
    const articles = await articleSearcher.search({ locale })

    return {
      page,
      articles,
    }
  }
  catch (error) {
    throw handleError(error)
  }
}, pageCacheOptions)
