export default defineEventHandler(async (event) => {
  try {
    const { slug } = await getValidatedRouterParams(event, ArticleSlugParams.parse)
    const { locale } = await getValidatedQuery(event, ArticleSlugQuery.parse)

    const $article = new ServerArticle(event)

    const [article] = await $article.search({
      slug,
      locale,
    })

    if (!article) {
      throw new ArticleNotFound(slug)
    }

    return {
      data: article,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
