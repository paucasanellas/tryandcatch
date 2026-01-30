export default defineEventHandler(async (event) => {
  const { categoryFindAll } = useContainer(event)

  try {
    const query = await getValidatedQuery(event, AppGetQuery.parse)

    const categories = await categoryFindAll.handle(query)

    return {
      categories,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
