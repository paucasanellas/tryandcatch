<template>
  <UEmpty
    loading
    variant="naked"
    :title="t('releases.loading.title')"
    :description="t('releases.loading.description')"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
