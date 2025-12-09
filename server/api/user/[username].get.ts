import { profileFields } from '~~/server/schemas/queries/profile'

export default defineEventHandler(async (event) => {
  const { client, readItems } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  const { username } = await getRouterParams(event)

  if (!username) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_user_no_username_provided',
    })
  }

  const user = await client.request(
    readItems('users', {
      filter: { username: { _eq: username } },
      fields: profileFields,
      limit: 1,
    }),
  )

  if (!user || user.length === 0) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_user_not_found',
    })
  }

  return user[0]
})
