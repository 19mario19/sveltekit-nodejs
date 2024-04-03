import { connectMongoDB } from "$lib/db/db"
import { BlogPostModel } from "$lib/db/models/BlogPostModel"
import { UserModel } from "$lib/db/models/UserModel"

import { UserRole } from "$lib/types"
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

  // If session, find user based on session
  const user = await UserModel.findOne({
    userAuthToken: toJSON(session),
  })
  // Add user to locals
  if (user) {
    console.log(`User: ${user.name}, with role: ${user.role}`)
    event.locals.user = {
      name: user.name,
      role: user.role,
    }
    if (user.role === UserRole.ADMIN) {
      const users: any[] = await UserModel.find({}).lean()
      event.locals.users = toJSON(users)

      const posts: any[] = await BlogPostModel.find({}).lean()
      event.locals.posts = toJSON(posts)

      console.log(event.locals)
    }
  }

  return await resolve(event)
}
