import type { PageServerLoad } from "./$types"

export const load = (async ({ locals }) => {
  if (locals.users) {
    return {
      users: locals.users,
    }
  }
  return {}
}) satisfies PageServerLoad
