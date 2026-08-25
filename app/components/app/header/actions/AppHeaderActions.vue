<template>
  <div class="flex items-center gap-1">
    <AppHeaderActionsColorModeButton />

    <UButton
      :to="repository.url"
      :aria-label="t('actions.openRepository')"
      target="_blank"
      color="neutral"
      variant="ghost"
      size="sm"
      icon="lucide:github"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { public: { repository } } = useRuntimeConfig()
</script>
