export default defineEventHandler(async (event) => {
  try {
    await getValidatedQuery(event, AppGetQuery.parse)

    return {}
  }
  catch (error) {
    new ServerError(error)
  }
})
