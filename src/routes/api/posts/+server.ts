import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { BlogPostModel as BlogPost } from "$lib/db/models/BlogPostModel"
import { toJSON } from "$lib/utils/toJSON"

export const GET: RequestHandler = async () => {
  const blogPosts = await BlogPost.find({}).sort({ createdAt: -1 }).lean()

  return json({ blogPosts: toJSON(blogPosts) })
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json() // Parse the JSON body from the request

  try {
    const newBlogPost = await BlogPost.create(body)
    return json({ message: "Blog post created", blogPost: toJSON(newBlogPost) })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return json(
      {
        error:
          (error as Error).message ||
          "Failed to create blog post. Please try again.",
      },
      { status: 500 },
    )
  }
}
