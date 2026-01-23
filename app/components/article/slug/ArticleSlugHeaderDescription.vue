<template>
  <div class="flex items-center gap-1">
    <UIcon
      v-if="icon"
      :name="icon"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string
}>()
</script>
