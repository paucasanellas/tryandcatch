<template>
  <UAlert
    color="error"
    variant="soft"
    icon="lucide:circle-alert"
    :title="t('articles.error.title')"
    :description="t('articles.error.description')"
    class="quantum-surface max-w-2xl mx-auto"
  >
    <template #actions>
      <UButton
        color="error"
        variant="soft"
        size="xs"
        :label="t('articles.actions.retry')"
        @click="refreshNuxtData()"
      />
    </template>
  </UAlert>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
