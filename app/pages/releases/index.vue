<template>
  <UPage>
    <ReleasesHero
      :title="t('releases.title')"
      :description="t('releases.wip')"
    />
  </UPage>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('releases.title'),
})
</script>
