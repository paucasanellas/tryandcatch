<template>
  <UEmpty
    icon="lucide:package-open"
    :title="t('releases.empty.title')"
    :description="t('releases.empty.description')"
    class="max-w-2xl mx-auto"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
