<template>
  <UPage>
    <ArticlesListHero
      v-if="data?.page"
      v-bind="data.page.content.hero"
    />

    <ArticlesListStatus
      v-if="status !== 'success' || !data?.articles.length"
      :status
    />

    <ArticlesListItems
      v-else
      :articles="data.articles"
    />
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      es: '/articulos',
    },
  },
})

const { locale } = useI18n()
const localePath = useLocalePath()
const requestUrl = useRequestURL()
const { getArticles } = useArticles()

const { data, status } = await useAsyncData(() => `page-articles-${locale.value}`, () => {
  return getArticles(locale.value)
}, {
  watch: [locale],
})

useSeoMeta({
  title: () => data.value?.page.title,
  description: () => data.value?.page.description,
})

useHead(() => {
  const canonical = new URL(localePath('articles'), requestUrl.origin).toString()

  return {
    link: [
      {
        rel: 'canonical',
        href: canonical,
      },
    ],
  }
})
</script>
