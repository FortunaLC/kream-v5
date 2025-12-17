<template>
  <ProfileTabGeneric>
    <WidgetEmptyState
      v-if="isPrivate"
      title="Private"
      description="This users liked videos are private."
      icon="lucide:lock"
    />
    <WidgetEmptyState v-else-if="isEmpty" description="This user hasn't liked any videos yet." />
    <p v-else>
      Likes
    </p>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
const { userProfile } = useUserProfile()
// const isEmpty = computed(() => userProfile.value.likes.length === 0)
const isEmpty = true
const isPrivate = computed(() => userProfile.value.show_likes)
</script>
