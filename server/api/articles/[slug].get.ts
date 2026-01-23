export default defineEventHandler(async (event) => {
  try {
    const { slug } = await getValidatedRouterParams(event, ArticleFindParams.parse)
    const { locale } = await getValidatedQuery(event, ArticleFindQuery.parse)

    const article = new ServerArticle(event)

    const data = await article.find(slug, locale)

    return {
      data,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
