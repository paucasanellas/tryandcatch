export class AppError extends Error {
  statusCode: number = 500
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}
