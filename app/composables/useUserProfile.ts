import type { NuxtError } from '#app'
import type { User } from '#auth-utils'

const profileData = ref<User | null>(null)
const profileUpdatePending = ref<boolean>(false)
const profileUpdateError = ref<NuxtError | null>(null)

export const useUserProfile = () => {
  const updateProfile = async (
    userId: string,
    updateData: Record<string, any>,
  ) => {
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

    if (error.value) {
      profileUpdateError.value = error.value
      return
    }

    profileData.value = data.value || null
  }

  return {
    profile: profileData,
    profileUpdatePending,
    profileUpdateError,
    updateProfile,
  }
}
