export default defineEventHandler(async (event) => {
  try {
    const { slug } = await getValidatedRouterParams(event, ArticleSlugParams.parse)
    const { locale } = await getValidatedQuery(event, ArticleSlugQuery.parse)

    const { articleFind } = useContainer(event)

    const article = await articleFind.handle({
      slug,
      locale,
    })

    return {
      data: article,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
