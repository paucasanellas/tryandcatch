<template>
  <UPage v-if="data?.article">
    <ArticleDetailHero :article="data.article" />
    <ArticleDetailContent :content="data.article.content" />
  </UPage>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const { getArticle } = useArticles()
const requestUrl = useRequestURL()

const slug = computed(() => String(route.params.slug))

const { data, error } = await useAsyncData(() => `page-article-${locale.value}-${slug.value}`, () => {
  return getArticle(locale.value, slug.value)
}, {
  watch: [locale, slug],
})

if (error.value) {
  throw createError({
    cause: error.value,
    data: error.value.data,
    fatal: true,
    message: error.value.message,
    status: error.value.status,
    statusText: error.value.statusText,
  })
}

definePageMeta({
  i18n: {
    paths: {
      es: '/articulos/[slug]',
    },
  },
})

useSeoMeta({
  title: () => data.value?.article.title,
  description: () => data.value?.article.description,
  ogType: 'article',
  ogTitle: () => data.value?.article.title,
  ogDescription: () => data.value?.article.description,
  ogImage: () => data.value
    ? new URL(data.value.article.image.src, requestUrl).toString()
    : undefined,
  twitterCard: 'summary_large_image',
  articlePublishedTime: () => data.value?.article.publishedAt,
})
</script>
