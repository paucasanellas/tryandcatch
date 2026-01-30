export default defineCachedEventHandler(async (event) => {
  try {
    const { locale } = await getValidatedQuery(event, PageHomeQuery.parse)

    const { articleSearch } = useContainer(event)

    const [featuredArticle] = await articleSearch.handle({
      locale,
      featured: true,
    })

    const latestArticles = await articleSearch.handle({
      locale,
    })

    return {
      data: {
        featuredArticle,
        latestArticles,
      },
    } satisfies PageHomeResponse
  }
  catch (error) {
    new ServerError(error)
  }
}, {
  name: 'home',
})
