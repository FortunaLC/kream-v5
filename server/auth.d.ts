declare module '#auth-utils' {
  // the user as it is available on the client side
  interface User {
    id: string
    name: string
    email: string
    username: string
    createdAt: Date
    show_favorites: boolean
    show_likes: boolean
    show_playlists: boolean
    videos: any[]
    bio?: string
    subtitle?: string
    twitter?: string
    instagram?: string
    website?: string
  }

  // the session includes the user and any other session data you want to store
  interface UserSession {
    loggedInAt: Date
  }

  // the secure session data is only available on the server side
  // we didn't add any secure session data in this example
  /* interface SecureSessionData {

  } */
}

export {}
