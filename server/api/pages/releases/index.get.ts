export default defineCachedEventHandler(async () => {
  const { releaseSearcher } = useServerContainer()

  try {
    const releases = await releaseSearcher.search()

    return {
      releases,
    }
  }
  catch (error) {
    throw handleError(error)
  }
}, {
  maxAge: 900,
  swr: true,
})
