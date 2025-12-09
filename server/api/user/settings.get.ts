import { z } from 'zod'

import type { User } from '#auth-utils'
import { userFields } from '~~/server/schemas/queries/user'

const QuerySchema = z.object({
  userId: z.string('error_user_no_id_provided').min(1),
})

export default defineEventHandler(async (event) => {
  const { client, readItem } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  const { data, success, error } = await getValidatedQuery(
    event,
    QuerySchema.safeParse,
  )

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: error?.message,
    })
  }

  const user = await client.request(
    readItem('users', data.userId, {
      fields: userFields,
      limit: 1,
    }),
  )

  if (!user) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_user_not_found',
    })
  }

  const userData = transformUserData(user as User)

  return userData
})
