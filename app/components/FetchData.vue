<template>
  <slot />
</template>

<script setup lang="ts">
// This component is to fetch all needed data for the app
// Only fetch stuff here that is always needed throughout the app
// Try to not await the fetching in here since it blocks the entire app from rendering!
const { fetchCategories } = useContent()

// Fetch categories data
fetchCategories()
</script>
