import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch, params: { slug } }) => {
  const res = await fetch(`/api/posts/${slug}`)
  const { blogPost } = await res.json()
  console.log(blogPost)
  if (blogPost) {
    return { blogPost }
  }
}) satisfies PageServerLoad
