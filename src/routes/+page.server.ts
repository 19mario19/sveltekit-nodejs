import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const res = await fetch("/api/blog-posts/")
  const { blogPosts } = await res.json()

  // const res1 = await fetch("/api/notes/65f69103cc8e652a18b2e6d0")
  // const { note } = await res1.json()
  // console.log(note)

  let test = "dnfsjanjsaffnsdjalkfnk"
  

  return { blogPosts }
}) satisfies PageServerLoad
