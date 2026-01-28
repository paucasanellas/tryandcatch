export default defineEventHandler(async (event) => {
  const { categoryFindAll } = useContainer(event)

  try {
    await getValidatedQuery(event, AppGetQuery.parse)

    const categories = await categoryFindAll.handle()

    return {
      categories,
    }
  }
  catch (error) {
    new ServerError(error)
  }
})
