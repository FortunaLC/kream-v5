import { categoryFields } from '~~/server/schemas/queries/categories'

export default defineEventHandler(async (event) => {
  const { client, readItems } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  try {
    const categories = await client.request(
      readItems('categories', {
        fields: categoryFields,
        filter: { active: { _eq: true } },
      }),
    )
    if (!categories || categories.length === 0) {
      return createError({
        statusCode: 400,
        statusMessage: 'error_categories_no_categories',
      })
    }

    return categories
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_request_failed',
    })
  }
})
