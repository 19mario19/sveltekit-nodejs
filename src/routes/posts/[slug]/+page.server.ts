import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch, params: { slug } }) => {
  const res = await fetch(`/api//blog-posts/${slug}`)
  const  {blogPost: post}  = await res.json()


  return { post }
}) satisfies PageServerLoad
