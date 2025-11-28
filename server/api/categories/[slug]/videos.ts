import { videoFields } from '~~/server/schemas/queries/video'

export default defineEventHandler(async (event) => {
  const { client, readItems } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  const { slug } = await getRouterParams(event)

  if (!slug) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_categories_no_slug_provided',
    })
  }

  try {
    const videos = await client.request(
      readItems('videos', {
        fields: videoFields,
        filter: {
          _and: [
            { status: { _eq: 'published' } },
            {
              categories: {
                categories_id: {
                  slug: { _eq: slug },
                },
              },
            },
          ],
        },
      }),
    )

    if (!videos || videos.length === 0) {
      return createError({
        statusCode: 400,
        statusMessage: 'error_videos_not_found',
      })
    }

    return videos
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_request_failed',
    })
  }
})
