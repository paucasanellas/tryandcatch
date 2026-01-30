import { ServerError } from '@@/server/contexts/shared/errors/Error'
import { H3Error } from 'h3'

export const useServerError = (error: unknown) => {
  if (error instanceof H3Error) {
    return createError({
      statusCode: error.statusCode,
      message: error.statusMessage,
    })
  }

  if (error instanceof ServerError) {
    return createError({
      statusCode: error.statusCode,
      message: error.message,
    })
  }

  return createError({
    statusCode: 500,
    message: 'Internal Server Error',
  })
}
