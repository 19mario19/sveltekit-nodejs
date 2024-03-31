import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { BlogPostModel as BlogPost } from "$lib/db/models/BlogPostModel"
import { toJSON } from "$lib/utils/toJSON"

export const GET: RequestHandler = async ({ params: { slug } }) => {
  const blogPost = await BlogPost.findOne({ _id: slug }).lean()

  return json({ blogPost: toJSON(blogPost) })
}

export const DELETE: RequestHandler = async ({ params: { slug } }) => {
  const blogPost = await BlogPost.deleteOne({ _id: slug }).lean()

  return json({ blogPost: toJSON(blogPost) })
}
