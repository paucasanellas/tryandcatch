import type { NuxtError } from 'nuxt/app'
import type { H3Error } from 'h3'

export const useServerError = () => {
  function handleError(error: NuxtError, fatal: boolean = false) {
    const { statusCode, message } = error.data as H3Error

    throw createError({
      statusCode: statusCode || 500,
      statusMessage: message || 'Internal Server Error',
      fatal,
    })
  }

  return {
    handleError,
  }
}
