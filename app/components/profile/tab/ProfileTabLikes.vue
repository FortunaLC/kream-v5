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
const { likes, showLikes } = useUserProfile()
const isEmpty = computed(() => likes.value.length === 0)
const isPrivate = computed(() => !showLikes.value)
</script>
