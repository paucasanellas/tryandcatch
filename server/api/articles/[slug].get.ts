export default defineEventHandler(async (event) => {
  try {
    const { slug } = await getValidatedRouterParams(event, ArticleFindParams.parse)
    const { locale } = await getValidatedQuery(event, ArticleFindQuery.parse)

    const serverArticle = new ServerArticle(event)

    const article = await serverArticle.find(slug, locale)

    return {
      article,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
