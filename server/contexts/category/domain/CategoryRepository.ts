import type { CategoryFindAllCriteria, CategoryFindCriteria } from '@@/server/contexts/category/domain/Category'

export interface CategoryRepository {
  all(criteria: CategoryFindAllCriteria): Promise<Category[]>
  find(criteria: CategoryFindCriteria): Promise<Category | undefined>
}
