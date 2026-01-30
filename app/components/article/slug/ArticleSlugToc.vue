<template>
  <UContentToc
    class="font-brand"
    :links="links"
    highlight
    highlight-color="primary"
    :title="$t('article.slug.toc.title')"
    :ui="{
      title: 'uppercase',
      container: 'border-none',
    }"
  />
</template>

<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'

defineProps<{
  links: TocLink[]
}>()
</script>
