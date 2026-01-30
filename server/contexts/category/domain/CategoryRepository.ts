export interface CategoryRepository {
  all(criteria: CategoryGetCriteria): Promise<Category[]>
}
