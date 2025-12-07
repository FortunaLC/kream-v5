<template>
  <ProfileTabGeneric>
    <WidgetEmptyState v-if="isEmpty" description="This user hasn't uploaded any videos yet." />
    <p v-else>
      Videos
    </p>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
const { videos } = useUserProfile()
const isEmpty = computed(() => videos.value.length === 0)
</script>
