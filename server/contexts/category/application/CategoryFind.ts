import type { CategoryRepository } from '@@/server/contexts/category/domain/CategoryRepository'
import type { CategoryFindCriteria } from '@@/server/contexts/category/domain/Category'
import { CategoryNotFoundError } from '@@/server/contexts/category/domain/CategoryError'

export class CategoryFind {
  constructor(readonly repository: CategoryRepository) {}

  async handle(criteria: CategoryFindCriteria) {
    const category = await this.repository.find(criteria)

    if (!category) {
      throw new CategoryNotFoundError(criteria.slug)
    }

    return category
  }
}
