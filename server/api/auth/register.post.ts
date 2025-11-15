export default defineEventHandler(async (event) => {
  await clearUserSession(event)

  // TODO: Get user from directus here
  const testUser = {
    username: 'test',
    email: 'test@example.com',
    password: 'password123',
  }

  const body = await readBody(event)
  const { email, password, username } = body

  // Check if user already exists
  if (email === testUser.email) {
    return createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    })
  }

  const newUser = {
    username,
    email,
    testData: 'TEST DATA FROM REGISTER',
    password: await hashPassword(password),
  }

  return await setUserSession(event, {
    user: newUser,
  })
})
