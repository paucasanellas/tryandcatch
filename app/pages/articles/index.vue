<template>
  <UPage>
    <ArticlesListHero
      :title="t('articles.title')"
      :description="t('articles.wip')"
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

const { t } = useI18n()

useSeoMeta({
  title: () => t('articles.title'),
})
</script>
