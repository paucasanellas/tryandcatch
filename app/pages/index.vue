<template>
  <main>
    <h1 class="text-3xl font-bold">
      {{ app.name }}
    </h1>
  </main>
</template>

<script lang="ts" setup>
const { app } = useAppConfig()
const { t } = useI18n()

useSeoMeta({
  title: t('home.meta.title'),
})
</script>
