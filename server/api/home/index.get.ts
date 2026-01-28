export default defineCachedEventHandler(async (event) => {
  try {
    const { locale } = await getValidatedQuery(event, HomeQuery.parse)

    const { articleSearch } = useContainer(event)

    const [featured] = await articleSearch.handle({
      locale,
      featured: true,
    })

    const latests = await articleSearch.handle({
      locale,
    })

    return {
      featured,
      latests,
    }
  }
  catch (error) {
    new ServerError(error)
  }
}, {
  name: 'home',
})
