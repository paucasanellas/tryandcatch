<template>
  <div class="flex items-center gap-2">
    <div class="flex items-center justify-center size-8 rounded-lg bg-primary-500/10">
      <UIcon
        name="lucide:square-terminal"
        class="size-5 bg-primary-500"
      />
    </div>
    <h1 class="text-2xl font-bold font-brand dark:text-white">
      {{ app.name }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
const { app } = useAppConfig()
</script>
