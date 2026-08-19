<template>
  <UPage>
    <BitacoraHero
      :title="t('blog.title')"
      :description="t('blog.wip')"
    />
  </UPage>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('blog.title'),
})
</script>
