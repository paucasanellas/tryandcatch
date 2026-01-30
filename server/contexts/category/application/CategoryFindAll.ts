import type { CategoryRepository } from '@@/server/contexts/category/domain/CategoryRepository'
import type { CategoryFindAllCriteria } from '@@/server/contexts/category/domain/Category'

export class CategoryFindAll {
  constructor(readonly repository: CategoryRepository) {}

  async handle(criteria: CategoryFindAllCriteria) {
    return this.repository.all(criteria)
  }
}
