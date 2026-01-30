import { queryCollection } from '@nuxt/content/server'
import type { CategoryRepository } from '@@/server/contexts/category/domain/CategoryRepository'
import type { CategoriesCollectionItem } from '@nuxt/content'

export class ContentCategoryRepository implements CategoryRepository {
  constructor(private readonly event: ServerEvent) {}

  async all(criteria: CategoryGetCriteria) {
    const categories = await queryCollection(this.event, 'categories')
      .where('locale', '=', criteria.locale)
      .all()

    return categories.map(this.categoryToDomain)
  }

  private categoryToDomain(category: CategoriesCollectionItem): Category {
    return {
      name: category.title,
      slug: category.slug,
      locale: category.locale,
    }
  }
}
