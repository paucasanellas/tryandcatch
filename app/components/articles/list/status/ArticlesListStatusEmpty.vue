<template>
  <UEmpty
    icon="lucide:notebook-tabs"
    :title="t('articles.empty.title')"
    :description="t('articles.empty.description')"
    class="max-w-2xl mx-auto"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
