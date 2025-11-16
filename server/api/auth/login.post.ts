import type { User } from '#auth-utils'
import { transformUserData } from '~~/server/utils/auth/transformUserData'

export default defineEventHandler(async (event) => {
  const { client, readItems } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  const body = await readBody(event)
  const { email, password } = body

  const users = await client.request(
    readItems('users', {
      fields: ['id', 'email', 'username', 'password'],
      filter: { email: { _eq: email } },
      limit: 1,
    }),
  )

  if (!users || users.length === 0) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_auth_no_user',
    })
  }

  const directusUser = users[0]
  const isPasswordValid = await verifyPassword(directusUser.password, password)

  if (!isPasswordValid) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_auth_invalid_login',
    })
  }

  const userData = transformUserData(directusUser as User)

  await setUserSession(event, {
    user: userData,
  })

  return await getUserSession(event)
})
