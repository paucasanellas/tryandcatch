export default defineEventHandler(async (event) => {
  try {
    const { locale } = await getValidatedQuery(event, HomeQuery.parse)

    const article = new ServerArticle(event)

    const [featured] = await article.search({
      locale,
      featured: true,
    })

    return {
      featured,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
