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
const { favorites, showFavorites } = useUserProfile()
const isEmpty = computed(() => favorites.value.length === 0)
const isPrivate = computed(() => !showFavorites.value)
</script>
