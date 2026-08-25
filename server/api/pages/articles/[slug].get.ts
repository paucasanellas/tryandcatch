import { getArticleParams, getArticleQuery } from '~~/shared/schemas/articles'

export default defineCachedEventHandler<Promise<GetArticleResponse>>(async (event) => {
  const { slug } = await getValidatedRouterParams(event, getArticleParams.parse)
  const { locale } = await getValidatedQuery(event, getArticleQuery.parse)
  const { articleFinder } = useServerContainer()

  try {
    const article = await articleFinder.find({ locale, slug })

    return {
      article,
    }
  }
  catch (error) {
    throw handleError(error)
  }
}, {
  maxAge: 900,
  swr: true,
})
