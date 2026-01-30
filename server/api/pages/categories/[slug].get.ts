export default defineEventHandler(async (event) => {
  try {
    const { slug } = await getValidatedRouterParams(event, CategoriesSlugParams.parse)
    const { locale } = await getValidatedQuery(event, CategoriesSlugQuery.parse)

    const { articleSearch, categoryFind } = useContainer(event)

    const { getWithoutBody } = useServerArticle()

    const category = await categoryFind.handle({ slug, locale })

    const articles = await articleSearch.handle({
      category: slug,
      locale,
    })

    return {
      data: {
        category,
        articles: articles.map(getWithoutBody),
      },
    } satisfies PageCategoriesSlug
  }
  catch (error) {
    throw useServerError(error)
  }
})
