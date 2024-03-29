import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const res = await fetch("/api/blog-posts/")
  const { blogPosts } = await res.json()

  return { blogPosts }
}) satisfies PageServerLoad
