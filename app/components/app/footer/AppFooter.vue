<template>
  <USeparator class="h-px" />
  <UFooter>
    <template #left>
      <p class="text-muted text-sm font-brand">
        {{ copyright }}
      </p>
    </template>
    <template #right>
      <div class="flex items-center gap-2">
        <UChip
          standalone
          inset
          color="success"
        />
        <p class="text-muted text-sm font-brand">
          {{ version }}
        </p>
      </div>
    </template>
  </UFooter>
</template>

<script lang="ts" setup>
const { app } = useAppConfig()

const copyright = computed(() => {
  return $t('footer.copyright', {
    year: new Date().getFullYear(),
    name: app.name,
  })
})

const version = computed(() => {
  return $t('footer.version', {
    version: app.version,
  })
})
</script>
