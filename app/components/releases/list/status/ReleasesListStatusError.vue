<template>
  <UAlert
    color="error"
    variant="soft"
    icon="lucide:circle-alert"
    :title="t('releases.error.title')"
    :description="t('releases.error.description')"
    class="quantum-surface max-w-2xl mx-auto"
  >
    <template #actions>
      <UButton
        color="error"
        variant="soft"
        size="xs"
        :label="t('releases.actions.retry')"
        @click="refreshNuxtData()"
      />
    </template>
  </UAlert>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
