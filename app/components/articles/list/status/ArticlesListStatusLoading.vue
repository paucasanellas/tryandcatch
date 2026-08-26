<template>
  <UEmpty
    loading
    variant="naked"
    :title="t('articles.loading.title')"
    :description="t('articles.loading.description')"
    class="quantum-surface max-w-2xl mx-auto rounded-xl"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
