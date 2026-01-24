describe('Store: AppStore', () => {
  it('should return an app state', () => {
    const store = useAppStore()

    expect(store.state).toStrictEqual({})
  })
})
