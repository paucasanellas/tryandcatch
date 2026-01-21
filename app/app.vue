<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1 class="text-3xl font-bold">
      {{ app.name }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
const { app } = useAppConfig()
</script>
