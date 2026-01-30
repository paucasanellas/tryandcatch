export default defineCachedEventHandler(async (event) => {
  try {
    const { locale } = await getValidatedQuery(event, PageHomeQuery.parse)

    const { articleSearch } = useContainer(event)

    const { getWithoutBody } = useServerArticle()

    const [featuredArticle] = await articleSearch.handle({
      locale,
      featured: true,
    })

    const latestArticles = await articleSearch.handle({
      locale,
    })

    return {
      data: {
        featuredArticle: featuredArticle ? getWithoutBody(featuredArticle) : undefined,
        latestArticles: latestArticles.map(getWithoutBody),
      },
    } satisfies PageHomeResponse
  }
  catch (error) {
    throw useServerError(error)
  }
}, {
  name: 'home',
})
