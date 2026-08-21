<template>
  <UPageSection :ui="{ container: 'py-12 sm:py-16 lg:py-24' }">
    <UChangelogVersions class="max-w-5xl mx-auto">
      <ReleasesListVersionsItem
        v-for="(release, index) in releases"
        :key="release.tag"
        :release="release"
        :latest="index === 0"
      />
    </UChangelogVersions>
  </UPageSection>
</template>

<script setup lang="ts">
const { releases } = defineProps<{
  releases: Release[]
}>()
</script>
