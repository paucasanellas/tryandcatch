import type { CategoryRepository } from '@@/server/contexts/category/domain/CategoryRepository'

export class CategoryFindAll {
  constructor(readonly repository: CategoryRepository) {}

  async handle() {
    return this.repository.all()
  }
}
