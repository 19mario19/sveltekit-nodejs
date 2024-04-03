import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"
import { UserRole } from "$lib/types"

export const load = (async ({ locals }) => {
  if (locals.user.role !== UserRole.ADMIN) {
    return redirect(302, "/posts")
  }
}) satisfies LayoutServerLoad
