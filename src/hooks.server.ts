import { connectMongoDB } from "$lib/db/db"
import { UserModel } from "$lib/db/models/UserModel"
import { toJSON } from "$lib/utils/toJSON"
import type { Handle } from "@sveltejs/kit"

async function startServer() {
  try {
    await connectMongoDB()
    console.log("Connected successfully to MongoDB")
  } catch (error) {
    console.error("Error starting server:", error)
  }
}

startServer()

export const handle: Handle = async ({ event, resolve }) => {
  // Get cookies from the browser
  const session = event.cookies.get("session")
  if (!session) {
    // If no session, load page as normal
    return await resolve(event)
  }
  console.log(session, typeof session)
  // If session, find user based on session
  const user = await UserModel.findOne({
    userAuthToken: toJSON(session),
  })
  console.log("Within handle: ", user)

  // Add user to locals
  if (user) {
    event.locals.user = {
      name: user.name,
      role: user.role,
    }
  }

  return await resolve(event)
}
