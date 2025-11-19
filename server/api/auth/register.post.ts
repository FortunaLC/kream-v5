import type { User } from '#auth-utils'
import { hashPassword } from '#imports'
import { transformUserData } from '~~/server/utils/auth/transformUserData'

export default defineEventHandler(async (event) => {
  const { client, readItems, createItem } = event.context.directus
  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  // TODO: Add better validation
  const body = await readBody(event)
  const { email, password, username } = body

  // Check if user already exists
  const existingUsers = await client.request(
    readItems('users', {
      fields: ['id', 'email', 'username'],
      filter: { email: { _eq: email } },
      limit: 1,
    }),
  )

  if (existingUsers && existingUsers.length > 0) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_auth_user_exists',
    })
  }

  const hashedPassword = await hashPassword(password)

  // Create new user
  const newDirectusUser = await client.request(
    createItem('users', {
      email,
      username,
      password: hashedPassword,
    }),
  )

  const userData = transformUserData(newDirectusUser as User)

  await setUserSession(event, {
    user: userData,
  })

  return await getUserSession(event)
})
