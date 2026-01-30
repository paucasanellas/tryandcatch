export default defineEventHandler(async (event) => {
  const { categoryFindAll } = useContainer(event)

  try {
    const query = await getValidatedQuery(event, AppQuery.parse)

    const categories = await categoryFindAll.handle(query)

    return {
      data: {
        categories,
      },
    } satisfies AppResponse
  }
  catch (error) {
    throw useServerError(error)
  }
})
