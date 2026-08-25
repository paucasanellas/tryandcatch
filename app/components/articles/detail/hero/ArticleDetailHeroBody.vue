<template>
  <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
    <span class="inline-flex items-center gap-1.5">
      <UIcon
        name="lucide:calendar-days"
        class="size-4"
        aria-hidden="true"
      />
      <NuxtTime
        :datetime="publishedAt"
        :locale="locale"
        date-style="long"
        time-zone="UTC"
      />
    </span>

    <span class="inline-flex items-center gap-1.5">
      <UIcon
        name="lucide:clock-3"
        class="size-4"
        aria-hidden="true"
      />
      {{ t('articles.readingTime', { minutes: readingTime }) }}
    </span>

    <span class="inline-flex items-center gap-1.5">
      <UIcon
        name="lucide:user-round"
        class="size-4"
        aria-hidden="true"
      />
      {{ author }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  publishedAt: string
  readingTime: number
  author: Article['author']
}>()

const { locale, t } = useI18n()
</script>
