import type { User } from '#auth-utils'

export default defineEventHandler(async (event) => {
  interface LoginUser extends User {
    password?: string
  }

  // TODO: Get user from directus here
  const testUser: LoginUser = {
    username: 'test2',
    email: 'test2@example.com',
    password: 'Test1234',
  }

  const body = await readBody(event)
  const { email, password } = body

  if (testUser.email !== email) {
    return createError({
      statusCode: 400,
      statusMessage: 'User does not exist',
    })
  }

  // TODO: Verify password here
  /* const isPasswordValid = await verifyPassword(password, testUser.password);

  if (!isPasswordValid) {
    return createError({
        statusCode: 400,
        statusMessage: "Invalid password",
    });
  } */

  delete testUser.password
  await setUserSession(event, {
    user: {
      ...testUser,
      testData: 'TEST DATA ON LOGIN',
    },
  })

  return await getUserSession(event)
})
