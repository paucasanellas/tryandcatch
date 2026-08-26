<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <span class="absolute bottom-8 left-8 font-mono text-xs text-dimmed">ERR_{{ statusCode }}</span>
    <span class="absolute right-8 top-8 font-mono text-xs text-dimmed">TRY → CATCH</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  statusCode: number
}>()
</script>
