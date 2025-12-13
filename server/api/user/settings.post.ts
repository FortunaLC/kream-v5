import { z } from 'zod'

import type { User } from '#auth-utils'

const QuerySchema = z.object({
  userId: z.string('The user ID is required!').min(4),
  update: z.object({
    subtitle: z.string().optional(),
    bio: z.string().optional(),
    twitter: z.url().optional(),
    instagram: z.url().optional(),
    website: z.url().optional(),
    show_favorites: z.boolean().optional(),
    show_likes: z.boolean().optional(),
    show_playlists: z.boolean().optional(),
  }),
})

export default defineEventHandler(async (event) => {
  const { client, updateItem } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  const { data, success, error } = await readValidatedBody(
    event,
    QuerySchema.safeParse,
  )

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: error?.message,
    })
  }

  try {
    const user = await client.request(
      updateItem('users', data.userId, {
        ...data.update,
      }),
    )

    if (!user) {
      return createError({
        statusCode: 400,
        statusMessage: 'error_user_not_updated',
      })
    }

    const userData = transformUserData(user as User)

    await setUserSession(event, {
      user: userData,
    })

    return await getUserSession(event)
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_user_update_failed',
    })
  }
})
