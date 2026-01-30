<template>
  <UBlogPosts :ui="{ base: 'lg:grid-cols-2' }">
    <UBlogPost
      v-for="article in articles"
      :key="article.slug"
      :title="article.title"
      :badge="{
        label: article.category ? article.category.name : $t('article.featured'),
        color: 'primary',
      }"
      :to="$localePath({ name: 'articles-slug', params: { slug: article.slug } })"
      :image="article.cover"
      :ui
    >
      <template #description>
        <p class="text-muted/70 text-sm">
          // <NuxtTime
            class="text-sm"
            day="numeric"
            month="long"
            year="numeric"
            relative
            :locale="article.locale"
            :datetime="article.date"
          />
        </p>
        <p class="text-muted/70 text-sm">
          // {{ $t('article.slug.readTime', { readTime: article.readTime }) }}
        </p>
      </template>
    </UBlogPost>
  </UBlogPosts>
</template>

<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

defineProps<{
  articles: ArticleWithoutBody[]
}>()

const ui: BlogPostProps['ui'] = {
  root: 'dark:bg-elevated/50',
  title: 'text-2xl font-brand',
  body: 'lg:pr-4 font-monospace',
}
</script>
