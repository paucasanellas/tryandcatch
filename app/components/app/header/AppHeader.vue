<template>
  <UHeader
    mode="slideover"
    :to="localePath({ name: 'index' })"
  >
    <template #title>
      <AppLogo />
    </template>
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
</script>
