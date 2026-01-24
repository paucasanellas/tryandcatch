export default defineEventHandler(async (event) => {
  try {
    const { slug } = await getValidatedRouterParams(event, ArticleSlugParams.parse)
    const { locale } = await getValidatedQuery(event, ArticleSlugQuery.parse)

    const article = new ServerArticle(event)

    const [data] = await article.search({
      slug,
      locale,
    })

    if (!data) {
      throw new ArticleNotFound(slug)
    }

    return {
      data,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
