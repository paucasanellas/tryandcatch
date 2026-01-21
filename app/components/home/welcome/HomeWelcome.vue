<template>
  <header>
    <h1 class="text-3xl font-bold">
      {{ app.name }}
    </h1>
  </header>
</template>

<script lang="ts" setup>
const { app } = useAppConfig()
</script>
