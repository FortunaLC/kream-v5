import type { User } from '#auth-utils'

/**
 * Transforms the user data received from Directus to exclude sensitive information.
 * @param directusUser The user data coming back from directus
 * @returns Returns an object that doesn't include sensitive data (like the password)
 */
export function transformUserData(directusUser: User) {
  return {
    id: directusUser.id,
    email: directusUser.email,
    username: directusUser.username,
    bio: directusUser.bio,
    subtitle: directusUser.subtitle,
    settings: {
      show_favorites: directusUser.show_favorites,
      show_likes: directusUser.show_likes,
      show_playlists: directusUser.show_playlists,
    },
    socials: {
      twitter: directusUser.twitter,
      instagram: directusUser.instagram,
      website: directusUser.website,
    },
    videos: directusUser.videos,
  }
}
