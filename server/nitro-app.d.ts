import type { DirectusClientWithAuth } from '../server/plugins/directus'

declare module 'nitropack/types' {
  interface NitroApp {
    $services: {
      directus: DirectusClientWithAuth
    }
  }
}

declare module 'nitropack' {
  interface NitroApp {
    $services: {
      directus: DirectusClientWithAuth
    }
  }
}
