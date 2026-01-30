<template>
  <UMain>
    <AppContainer>
      <UPage
        v-if="data"
        :ui
      >
        <ArticleSlugHeader
          :title="data.article.title"
          :date="data.article.date"
          :read-time="data.article.readTime"
        />
        <UPageBody>
          <NuxtImg
            :src="data.article.cover"
            :alt="data.article.title"
          />
          <ContentRenderer
            :value="data.article"
            class="prose prose-lg dark:text-white dark:prose-headings:prose-a:text-white prose-headings:prose-a:no-underline prose-headings:font-brand"
          />
        </UPageBody>
        <template #left>
          <UPageAside>
            <ArticleSlugToc
              v-if="data.article.body.toc"
              :links="data.article.body.toc.links"
            />
          </UPageAside>
        </template>
        <template #right>
          <UPageAside>
            <USkeleton class="h-48 w-full" />
          </UPageAside>
        </template>
      </UPage>
    </AppContainer>
  </UMain>
</template>

<script lang="ts" setup>
import type { PageProps } from '@nuxt/ui'

const { params } = useRoute()
const { handleError } = useServer()

const { data, error } = await useAsyncData(`article-${params.slug}`, async () => {
  const { data } = await useArticle().getBySlug(params.slug as string)

  return {
    article: data.article,
  }
})

if (error.value) {
  handleError(error.value)
}

useSeoMeta({
  title: data.value?.article.title,
  description: data.value?.article.description,
})

defineI18nRoute({
  paths: {
    es: '/[slug]',
  },
})

const ui: PageProps['ui'] = {
  root: 'lg:grid-cols-12 lg:gap-8',
  left: 'block lg:col-span-2',
  center: 'lg:col-span-7',
  right: 'order-last block lg:col-span-3',
}
</script>
