<template>
  <div>
    <UPageHeader :ui="{ root: 'border-none', title: 'font-brand sm:text-2xl' }">
      <template #title>
        <span class="text-primary">function</span> getRecentPosts()
      </template>
    </UPageHeader>
    <UBlogPosts :ui="{ base: 'lg:grid-cols-2' }">
      <UBlogPost
        v-for="article in articles"
        :key="article.slug"
        :title="article.title"
        :to="$localePath({ name: 'articles-slug', params: { slug: article.slug } })"
        :description="article.description"
        :image="article.cover"
        :ui
      />
    </UBlogPosts>
  </div>
</template>

<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

defineProps<{
  articles: Article[]
}>()

const ui: BlogPostProps['ui'] = {
  root: 'dark:bg-elevated/50',
  title: 'text-2xl font-brand',
  body: 'lg:pr-4 font-monospace',
}
</script>
