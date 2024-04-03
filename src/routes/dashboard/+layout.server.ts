import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"
import { UserRole } from "$lib/types"

export const load = (async ({locals}) => {
  if (locals.user.role !== UserRole.ADMIN) {
    throw redirect(302, "/posts")
  }

  let posts: any[] = []
  let users: any[] = []

  if (locals.users) {
    users = locals.users
  }
  if (locals.posts) {
    posts = locals.posts
  }

  return { posts, users }
}) satisfies LayoutServerLoad
