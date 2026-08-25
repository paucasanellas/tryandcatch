import type { Collections } from '@nuxt/content'
import { queryCollection } from '@nuxt/content/server'
import { useEvent } from 'nitropack/runtime'

import { Article } from '~~/server/contexts/articles/domain/Article'
import { InvalidArticleError } from '~~/server/contexts/articles/domain/ArticleErrors'

import type { FindArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'
import type { ArticleRepository } from '~~/server/contexts/articles/domain/ArticleRepository'
import type { ContentArticle } from '~~/server/contexts/articles/infrastructure/ContentArticle'

export class ContentArticleRepository implements ArticleRepository {
  async find(criteria: FindArticleCriteria) {
    try {
      const event = useEvent()
      const collection = this.buildCollectionName(criteria)
      const stem = `${criteria.locale}/articles/${criteria.slug}`
      const document = await queryCollection(event, collection)
        .where('stem', '=', stem)
        .first() as ContentArticle | null

      if (!document) {
        return null
      }

      return Article.create({
        title: document.title,
        description: document.description,
        publishedAt: document.publishedAt,
        readingTime: document.readingTime,
        author: document.author,
        categories: document.categories,
        image: document.image,
        content: document.rawbody,
      })
    }
    catch (error) {
      if (error instanceof InvalidArticleError) {
        throw error
      }

      throw new InvalidArticleError('Article could not be retrieved')
    }
  }

  private buildCollectionName(criteria: FindArticleCriteria) {
    return `articles_${criteria.locale}` as keyof Collections
  }
}
