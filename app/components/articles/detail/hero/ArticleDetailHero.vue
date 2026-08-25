<template>
  <UPageHero
    orientation="vertical"
    :title="article.title"
    :description="article.description"
    :ui="{
      container: 'pt-12 pb-0! sm:pt-16 lg:pt-20 gap-10 sm:gap-12',
      headline: 'flex-col gap-5 font-mono',
      title: 'text-4xl sm:text-5xl lg:text-6xl',
      description: 'max-w-3xl mx-auto',
      body: 'mt-6',
    }"
  >
    <template #headline>
      <ArticleDetailHeroHeadline :categories="article.categories" />
    </template>

    <template #body>
      <ArticleDetailHeroBody
        :published-at="article.publishedAt"
        :reading-time="article.readingTime"
        :author="article.author"
      />
    </template>

    <ArticleDetailHeroImage :image="article.image" />
  </UPageHero>
</template>

<script setup lang="ts">
const { article } = defineProps<{
  article: Article
}>()
</script>
