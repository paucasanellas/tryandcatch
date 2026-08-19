<template>
  <UFooter :ui="{ root: 'border-t border-default' }">
    <template #left>
      <ULink
        :to="`${repository.url}/releases/tag/v${version}`"
        target="_blank"
        class="font-mono text-xs text-dimmed transition-colors hover:text-highlighted"
      >
        {{ t('footer.version', { version }) }}
      </ULink>
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
        icon="lucide:github"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { public: { version, repository } } = useRuntimeConfig()
</script>
