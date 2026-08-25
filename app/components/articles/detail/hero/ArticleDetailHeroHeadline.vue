<template>
  <div class="flex flex-wrap justify-center gap-2">
    <UBadge
      v-for="category in categories"
      :key="category"
      :label="t(`articles.categories.${category}`)"
      color="secondary"
      variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: ArticleCategory[]
}>()

const { t } = useI18n()
</script>
