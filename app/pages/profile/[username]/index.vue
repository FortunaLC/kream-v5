<template>
  <div>
    <ProfileHeader :title="userProfile.username" :description="userProfile.subtitle" />
    <div class="w-full flex justify-center">
      <UiLoader v-if="userProfilePending" class="my-10 size-10" icon="svg-spinners:pulse-2" />
      <UiAlert
        v-else-if="userProfileError"
        class="my-10 max-sm:mx-10 sm:w-3/5"
        variant="destructive"
        title="Error"
        description="Sorry, something went wrong on our part. Try again later."
        icon="lucide:alert-circle"
      />
      <ProfileTabs v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProfile, userProfile, userProfilePending, userProfileError } = useUserProfile()

await getProfile(route.params.username as string)
</script>
