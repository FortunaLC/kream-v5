import type { NuxtError } from '#app'

const profile = ref(null)
const profileError: Ref<NuxtError | null> = ref(null)
const profilePending = ref(true)

export const useUserProfile = () => {
  const fetchProfile = async (username: string) => {
    if (profile.value) {
      return
    }
    const { data, error, pending } = await useAsyncData(
      `user-profile-${username}`,
      () => $fetch(`/api/user/${username}`, { method: 'GET' }),
    )

    profilePending.value = pending.value

    if (error.value) {
      profileError.value = error.value
      return
    }

    profile.value = data.value || null
  }

  return {
    fetchProfile,
    profile,
    profileError,
    profilePending,
    showLikes: computed(() => profile.value?.show_likes),
    likes: computed(() => profile.value?.likes || []),
    showFavorites: computed(() => profile.value?.show_favorites),
    favorites: computed(() => profile.value?.favorites || []),
    showPlaylists: computed(() => profile.value?.show_playlists),
    playlists: computed(() => profile.value?.playlists || []),
    videos: computed(() => profile.value?.videos || []),
  }
}
