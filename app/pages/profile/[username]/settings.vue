<template>
  <div>
    <ProfileHeader :description="user?.subtitle" :title="user?.username" />
    <div class="w-full flex justify-center">
      <UiLoader v-if="!ready" class="my-10 size-10" icon="svg-spinners:pulse-2" />
      <UiAlert
        v-else-if="!user"
        class="my-10 max-sm:mx-10 sm:w-3/5"
        variant="destructive"
        title="Error"
        description="Sorry, something went wrong on our part. Try again later."
        icon="lucide:alert-circle"
      />
      <ProfileSettingsTabs v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user, fetch, ready } = useUserSession()

// Refetch user data to be up to date with user data
await fetch()
</script>

<style scoped></style>
