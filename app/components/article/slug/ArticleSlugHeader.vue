<template>
  <header class="font-brand">
    <UPageHeader
      :title="title"
      :ui="{
        root: 'border-none',
        title: 'sm:text-5xl',
        description: 'flex items-center gap-4 text-sm',
      }"
    >
      <template #description>
        <ArticleSlugHeaderDescription icon="lucide:calendar">
          <NuxtTime
            day="numeric"
            month="long"
            year="numeric"
            :locale
            :datetime="date"
          />
        </ArticleSlugHeaderDescription>
        <ArticleSlugHeaderDescription icon="lucide:clock">
          <p>{{ $t('article.slug.readTime', { readTime }) }}</p>
        </ArticleSlugHeaderDescription>
      </template>
    </UPageHeader>
  </header>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

defineProps<{
  title: string
  date: string
  readTime: number
}>()
</script>
