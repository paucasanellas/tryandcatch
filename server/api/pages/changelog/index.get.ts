export default defineEventHandler(async (event) => {
  try {
    const { locale } = await getValidatedQuery(event, PageChangelogQuery.parse)

    const { changelogSearch } = useContainer(event)

    const changelogs = await changelogSearch.handle({
      locale,
    })

    return {
      data: {
        changelogs,
      },
    } satisfies PageChangelog
  }
  catch (error) {
    throw useServerError(error)
  }
})
