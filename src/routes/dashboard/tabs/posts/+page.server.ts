import type { PageServerLoad } from "./$types"

export const load = (async ({ locals }) => {
  if (locals.posts) {
    return {
      posts: locals.posts,
    }
  }
  return {}
}) satisfies PageServerLoad
