<template>
  <UPageHeader :ui="{ root: 'border-none' }">
    <UBlogPost
      :title="article.title"
      :description="article.description"
      image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
      :date="article.date"
      :to="$localePath({ name: 'articles-slug', params: { slug: article.slug } })"
      orientation="horizontal"
      variant="soft"
    />
  </UPageHeader>
</template>

<script lang="ts" setup>
defineProps<{
  article: Omit<Article, 'body'>
}>()
</script>
