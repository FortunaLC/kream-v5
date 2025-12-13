import type {
  DirectusClient,
  RestClient,
  WebSocketClient,
  StaticTokenClient,
} from '@directus/sdk'
import {
  createDirectus,
  readItem,
  readItems,
  createItem,
  updateItem,
  rest,
  staticToken,
  realtime,
} from '@directus/sdk'
import { defineNitroPlugin, useRuntimeConfig } from 'nitropack/runtime'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DirectusSchema = any
export type DirectusClientWithAuth = DirectusClient<DirectusSchema>
  & RestClient<DirectusSchema>
  & StaticTokenClient<DirectusSchema>
  & WebSocketClient<DirectusSchema>

declare module 'h3' {
  interface H3EventContext {
    directus: {
      client: DirectusClientWithAuth
      readItem: typeof readItem
      readItems: typeof readItems
      createItem: typeof createItem
      updateItem: typeof updateItem
    }
  }
}

// Types for nitroApp.$services live in `types/nitro-app.d.ts`

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()

  if (!config.directusUrl) {
    throw new Error(
      'NUXT_DIRECTUS_URL environment variable is required. Please set it in your .env file or environment variables.',
    )
  }
  if (!config.directusToken) {
    throw new Error(
      'NUXT_DIRECTUS_TOKEN environment variable is required. Please set it in your .env file or environment variables.',
    )
  }

  const directus = createDirectus<DirectusSchema>(config.directusUrl)
    .with(rest())
    .with(realtime())
    .with(staticToken(config.directusToken))

  // const unsubscribe = await setupSubscriptions(directus)

  // Attach to runtime
  nitroApp.hooks.hook('request', (event) => {
    event.context.directus = {
      client: directus,
      readItem,
      readItems,
      createItem,
      updateItem,
    }
  })

  // Attach to nitroApp.$services for usage in other nitro plugins
  nitroApp.$services = {
    directus,
  }
})
