export type AppColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | undefined

export type AppResponse = ServerSingleResponse<{
  categories: Category[]
}>

export type AppState = AppResponse['data']
