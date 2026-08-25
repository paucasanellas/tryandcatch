import { queryCollection } from '@nuxt/content/server'
import { useEvent } from 'nitropack/runtime'

import { Article } from '~~/server/contexts/articles/domain/Article'
import { ArticleSummary } from '~~/server/contexts/articles/domain/ArticleSummary'
import { InvalidArticleError } from '~~/server/contexts/articles/domain/ArticleErrors'

import type { FindArticleCriteria, SearchArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'
import type { ArticleRepository } from '~~/server/contexts/articles/domain/ArticleRepository'
import type { ContentArticle, ContentArticleSummary } from '~~/server/contexts/articles/infrastructure/ContentArticle'

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

  async search(criteria: SearchArticleCriteria) {
    try {
      const event = useEvent()
      const collection = this.buildCollectionName(criteria)
      const documents = await queryCollection(event, collection)
        .select('stem', 'title', 'description', 'publishedAt', 'readingTime', 'author', 'categories', 'image')
        .all() as ContentArticleSummary[]

      return documents
        .map(document => ArticleSummary.create({
          slug: document.stem.split('/').at(-1) ?? '',
          title: document.title,
          description: document.description,
          publishedAt: document.publishedAt,
          readingTime: document.readingTime,
          author: document.author,
          categories: document.categories,
          image: document.image,
        }))
        .sort((current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt))
    }
    catch (error) {
      if (error instanceof InvalidArticleError) {
        throw error
      }

      throw new InvalidArticleError('Articles could not be retrieved')
    }
  }

  private buildCollectionName(criteria: FindArticleCriteria | SearchArticleCriteria) {
    return `articles_${criteria.locale}` as 'articles_es'
  }
}
