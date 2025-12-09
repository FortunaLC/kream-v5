<template>
  <div>
    <ProfileHeader />
    <div class="w-full flex justify-center">
      <UiLoader v-if="pending" class="my-10 size-10" icon="svg-spinners:pulse-2" />
      <UiAlert
        v-else-if="error"
        class="my-10 max-sm:mx-10 sm:w-3/5"
        variant="destructive"
        title="Error"
        description="Sorry, something went wrong on our part. Try again later."
        icon="lucide:alert-circle"
      />
      <ProfileSettingsForm v-else :settings="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user } = useUserSession()
const route = useRoute()

const { data, pending, error } = await useFetch('/api/user/settings', {
  method: 'GET',
  query: {
    userId: user.value?.id,
  },
})
</script>

<style scoped></style>
