import { UnprocessableEntityError } from '~~/server/contexts/shared/domain/DomainErrors'

export class InvalidReleaseError extends UnprocessableEntityError {
  constructor(override readonly cause: string) {
    super(cause)
  }
}
