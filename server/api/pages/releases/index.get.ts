export default defineCachedEventHandler(() => {
  const { container } = useNitroApp()

  return container.getReleasesController.run()
}, {
  maxAge: 900,
  swr: true,
})
