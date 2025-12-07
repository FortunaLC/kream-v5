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
const { playlists, showPlaylists } = useUserProfile()
const isEmpty = computed(() => playlists.value.length === 0)
const isPrivate = computed(() => !showPlaylists.value)
</script>
