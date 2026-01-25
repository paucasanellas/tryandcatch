export const useAppStore = defineStore('app', () => {
  const state = reactive<AppState>({})

  function init(app: AppState) {
    Object.assign(state, app)
  }

  return {
    state,
    init,
  }
})
