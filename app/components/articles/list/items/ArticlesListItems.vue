<template>
  <UPageSection :ui="{ container: 'py-12 sm:py-16 lg:py-24' }">
    <UBlogPosts
      orientation="vertical"
      class="max-w-5xl mx-auto"
    >
      <ArticlesListItem
        v-for="article in articles"
        :key="article.slug"
        :article
      />
    </UBlogPosts>
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  articles: Array<ArticleSummary & { to: string }>
}>()
</script>
