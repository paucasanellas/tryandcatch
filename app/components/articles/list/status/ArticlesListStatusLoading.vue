<template>
  <UEmpty
    loading
    variant="naked"
    :title="t('articles.loading.title')"
    :description="t('articles.loading.description')"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
