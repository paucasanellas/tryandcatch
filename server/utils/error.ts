import { H3Error } from 'h3'

export class ServerError {
  constructor(private readonly error: unknown) {
    this.log()
    this.handle()
  }

  handle() {
    if (this.error instanceof H3Error) {
      throw createError({
        statusCode: this.error.statusCode,
        message: this.error.statusMessage,
      })
    }

    if (this.error instanceof AppError) {
      throw createError({
        statusCode: this.error.statusCode,
        message: this.error.message,
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }

  private log() {
    console.error(this.error)
  }
}
