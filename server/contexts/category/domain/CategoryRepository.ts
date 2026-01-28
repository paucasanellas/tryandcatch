export interface CategoryRepository {
  all(): Promise<Category[]>
}
