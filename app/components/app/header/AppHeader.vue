<template>
  <UHeader
    class="quantum-chrome quantum-chrome-header"
    :to="localePath('/')"
    :title="t('app.name')"
    :ui="{
      root: 'border-b-0 bg-transparent',
      body: 'bg-default/70 backdrop-blur-xl',
    }"
  >
    <template #title>
      <AppHeaderLogo />
    </template>

    <AppHeaderNavigation />

    <template #right>
      <AppHeaderActions />
    </template>

    <template #body>
      <AppHeaderNavigation />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
