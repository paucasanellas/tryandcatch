<template>
  <UPageSection :ui>
    <template #title>
      <span class="text-primary">{{ $t('home.section.title.prefix') }}</span>
      {{ $t('home.latest.title') }}
    </template>

    <ArticleList :articles />
  </UPageSection>
</template>

<script lang="ts" setup>
import type { PageSectionProps } from '@nuxt/ui'

defineProps<{
  articles: ArticleWithoutBody[]
}>()

const ui: PageSectionProps['ui'] = {
  title: 'text-2xl sm:text-2xl lg:text-3xl text-left',
  container: 'py-8 sm:py-8 lg:py-12 px-0 sm:px-0 lg:px-0 gap-8 sm:gap-8',
}
</script>
