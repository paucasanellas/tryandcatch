import { DomainError } from '~~/server/contexts/shared/domain/DomainErrors'

export function handleError(error: unknown) {
  if (error instanceof DomainError) {
    return createError({
      statusCode: error.statusCode,
      statusMessage: error.message,
      data: {
        code: error.name,
      },
    })
  }

  return createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
  })
}
