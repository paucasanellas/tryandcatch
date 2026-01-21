<template>
  <main>
    <HomeWelcome />
  </main>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({
  title: t('home.meta.title'),
})
</script>
