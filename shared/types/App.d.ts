export type AppResponse = ServerSingleResponse<{
  categories: Category[]
}>

export type AppState = AppResponse['data']
