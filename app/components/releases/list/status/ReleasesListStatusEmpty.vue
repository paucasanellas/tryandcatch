<template>
  <UEmpty
    icon="lucide:package-open"
    :title="t('releases.empty.title')"
    :description="t('releases.empty.description')"
    class="quantum-surface max-w-2xl mx-auto rounded-xl"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
