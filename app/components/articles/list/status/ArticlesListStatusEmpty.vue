<template>
  <UEmpty
    icon="lucide:notebook-tabs"
    :title="t('articles.empty.title')"
    :description="t('articles.empty.description')"
    class="quantum-surface max-w-2xl mx-auto rounded-xl"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
