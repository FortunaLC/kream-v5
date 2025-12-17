import type { NuxtError } from '#app'

const profileUpdated = ref<any>(null)
const profileUpdatePending = ref<boolean>(true)
const profileUpdateError = ref<NuxtError | null>(null)

const userProfile = ref<any>(null)
const userProfilePending = ref<boolean>(true)
const userProfileError = ref<NuxtError | null>(null)

export const useUserProfile = () => {
  const updateProfile = async (
    userId: string,
    updateData: Record<string, any>,
  ) => {
    try {
      const { data, error, pending } = await useAsyncData(
        `update-profile-${userId}`,
        () =>
          $fetch('/api/user/settings', {
            method: 'POST',
            body: {
              userId: userId,
              update: updateData,
            },
          }),
      )

      profileUpdatePending.value = pending.value
      profileUpdated.value = data.value
    } catch (err) {
      console.error('Error updating user profile:', err)
      profileUpdateError.value = err as NuxtError
    }
  }

  const getProfile = async (username: string) => {
    try {
      const { data, error, pending } = await useAsyncData(
        `user-profile-${username}`,
        () =>
          $fetch(`/api/user/${username}`, {
            method: 'GET',
          }),
      )

      userProfilePending.value = pending.value

      userProfile.value = data.value
    } catch (err) {
      console.error('Error fetching user profile:', err)
      userProfileError.value = err as NuxtError
    }
  }

  return {
    updateProfile,
    getProfile,
    userProfile,
    userProfilePending,
    userProfileError,
    profileUpdated,
    profileUpdatePending,
    profileUpdateError,
  }
}
