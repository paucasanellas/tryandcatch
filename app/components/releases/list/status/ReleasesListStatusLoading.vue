<template>
  <UEmpty
    loading
    variant="naked"
    :title="t('releases.loading.title')"
    :description="t('releases.loading.description')"
    class="quantum-surface max-w-2xl mx-auto rounded-xl"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
