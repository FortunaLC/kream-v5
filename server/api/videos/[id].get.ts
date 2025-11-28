import { videoFields } from '~~/server/schemas/queries/video'

export default defineEventHandler(async (event) => {
  const { client, readItem } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  const { id } = await getRouterParams(event)

  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_videos_no_id_provided',
    })
  }

  const video = await client.request(
    readItem('videos', id as string, {
      fields: videoFields,
      filter: { status: { _eq: 'published' } },
      limit: 1,
    }),
  )

  if (!video) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_videos_not_found',
    })
  }

  return video
})
