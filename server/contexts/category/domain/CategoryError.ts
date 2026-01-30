import { NotFoundError } from '@@/server/contexts/shared/errors/Error'

export class CategoryNotFoundError extends NotFoundError {
  constructor(slug: string) {
    super(`Category not found: ${slug}`)
  }
}
