import { videoFields } from '~~/server/schemas/queries/video'

export default defineEventHandler(async (event) => {
  const { client, readItems } = event.context.directus

  if (!client) {
    return createError({
      statusCode: 500,
      statusMessage: 'error_directus_no_connection',
    })
  }

  // TODO: Add amount of videos and offset for pagination...
  const videos = await client.request(
    readItems('videos', {
      fields: videoFields,
      filter: { status: { _eq: 'published' } },
    }),
  )

  if (!videos || videos.length === 0) {
    return createError({
      statusCode: 400,
      statusMessage: 'error_videos_no_videos',
    })
  }

  return videos
})
