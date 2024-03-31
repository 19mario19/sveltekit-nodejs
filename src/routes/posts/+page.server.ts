import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const res = await fetch("/api/posts")
    const { blogPosts } = await res.json()

    return { blogPosts }
  } catch (error) {
    console.error("Error fetching tutorials from MongoDB:", error)
    throw error
  }
}
