<template>
  <UMain>
    <AppContainer>
      <UPage v-if="data">
        <ArticleSlugHeader
          :title="data.article.title"
          :date="data.article.date"
          :read-time="data.article.readTime"
        />
        <UPageBody>
          <ContentRenderer :value="data.article" />
        </UPageBody>
        <template #left>
          <ArticleSlugToc
            v-if="data.article.body.toc"
            :links="data.article.body.toc.links"
          />
        </template>
      </UPage>
    </AppContainer>
  </UMain>
</template>

<script lang="ts" setup>
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
</script>
