<template>
  <ProfileTabGeneric>
    <WidgetEmptyState
      v-if="isPrivate"
      title="Private"
      description="This users favorites are private."
      icon="lucide:lock"
    />
    <WidgetEmptyState v-else-if="isEmpty" description="This user hasn't favorited any videos yet." />
    <p v-else>
      Favorites
    </p>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
const { userProfile } = useUserProfile()
// const isEmpty = computed(() => userProfile.value.favorites.length === 0)
const isEmpty = true
const isPrivate = computed(() => userProfile.value.show_favorites)
</script>
