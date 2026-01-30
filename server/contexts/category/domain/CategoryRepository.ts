import type { CategoryFindAllCriteria } from '@@/server/contexts/category/domain/Category'

export interface CategoryRepository {
  all(criteria: CategoryFindAllCriteria): Promise<Category[]>
}
