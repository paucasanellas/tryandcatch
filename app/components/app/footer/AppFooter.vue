<template>
  <UFooter :ui="{ root: 'border-t border-default' }">
    <template #left>
      <p class="font-mono text-xs text-dimmed">
        {{ t('footer.version', { version }) }}
      </p>
    </template>

    <AppFooterNavigation />

    <template #right>
      <UButton
        :to="repository.url"
        :aria-label="t('actions.openRepository')"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-github"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { public: { version, repository } } = useRuntimeConfig()
</script>
