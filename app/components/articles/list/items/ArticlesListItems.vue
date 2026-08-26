<template>
  <UPageSection
    class="quantum-divider"
    :ui="{ container: 'py-12 sm:py-16 lg:py-24' }"
  >
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
  articles: ArticleSummary[]
}>()
</script>
