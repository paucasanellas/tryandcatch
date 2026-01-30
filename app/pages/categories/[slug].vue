<template>
  <UMain>
    <AppContainer>
      <UPage v-if="data">
        <UPageHero
          :title="data.category.name"
          :description="data.category.description"
        />
        <UPageBody>
          <ArticleList :articles="data.articles" />
        </UPageBody>
      </UPage>
    </AppContainer>
  </UMain>
</template>

<script lang="ts" setup>
const { params } = useRoute()
const { handleError } = useServer()

const { data, error } = await useAsyncData(`category-${params.slug}`, async () => {
  const { data } = await useCategory().getBySlug(params.slug as string)

  return {
    articles: data.articles,
    category: data.category,
  }
})

if (error.value) {
  handleError(error.value)
}

useSeoMeta({
  title: data.value?.category.name,
  description: data.value?.category.description,
})

defineI18nRoute({
  paths: {
    es: '/categoria/[slug]',
  },
})
</script>
