<template>
  <ProfileTabGeneric>
    <WidgetEmptyState v-if="isEmpty" description="This user hasn't uploaded any videos yet." />
    <p v-else>
      Videos
    </p>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
const { userProfile } = useUserProfile()
const isEmpty = computed(() => userProfile.value.videos.length === 0)
</script>
