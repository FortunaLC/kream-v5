<template>
  <ProfileTabGeneric>
    <WidgetEmptyState
      v-if="isPrivate"
      title="Private"
      description="This users playlists are private."
      icon="lucide:lock"
    />
    <WidgetEmptyState v-else-if="isEmpty" description="This user hasn't created any playlists yet." />
    <p v-else>
      Playlists
    </p>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
const { userProfile } = useUserProfile()
// const isEmpty = computed(() => userProfile.value.playlists.length === 0)
const isEmpty = false
const isPrivate = computed(() => userProfile.value.show_playlists)
</script>
