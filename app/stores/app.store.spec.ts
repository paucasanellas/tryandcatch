describe('Store: AppStore', () => {
  it('should init app store', () => {
    const store = useAppStore()

    store.init({
      categories: [],
    })

    expect(store.state).toStrictEqual({
      categories: [],
    })
  })
})
