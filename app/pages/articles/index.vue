<template>
  <UPage>
    <ArticlesListHero
      :title="t('articles.title')"
      :description="t('articles.wip')"
    />
  </UPage>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('articles.title'),
})
</script>
