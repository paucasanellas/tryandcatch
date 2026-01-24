<template>
  <UPageHeader :ui="{ root: 'border-none' }">
    <UBlogPost
      :title="article.title"
      :image="article.cover"
      :badge="{
        label: 'Release',
        color: 'primary',
      }"
      :to="$localePath({ name: 'articles-slug', params: { slug: article.slug } })"
      orientation="horizontal"
      variant="outline"
      :ui
    >
      <template #description>
        <p class="text-muted">
          {{ article.description }}
        </p>
        <USeparator
          class="h-8"
        />
        <p class="text-muted/70 text-sm">
          // <NuxtTime
            class="text-sm"
            day="numeric"
            month="long"
            year="numeric"
            relative
            :locale
            :datetime="article.date"
          />
        </p>
        <p class="text-muted/70 text-sm">
          // {{ $t('article.slug.readTime', { readTime: article.readTime }) }}
        </p>
      </template>
    </UBlogPost>
  </UPageHeader>
</template>

<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

const { locale } = useI18n()

defineProps<{
  article: Omit<Article, 'body'>
}>()

const ui: BlogPostProps['ui'] = {
  root: 'dark:bg-elevated/50',
  header: 'aspect-[1/1]',
  title: 'text-4xl font-brand',
  body: 'lg:pr-4 font-monospace',
}
</script>
