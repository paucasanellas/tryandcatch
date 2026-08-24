export abstract class DomainError extends Error {
  abstract readonly statusCode: number

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name
  }
}

export class NotFoundError extends DomainError {
  readonly statusCode = 404
}

export class UnprocessableEntityError extends DomainError {
  readonly statusCode = 422
}
