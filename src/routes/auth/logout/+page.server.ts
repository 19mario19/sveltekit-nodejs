import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async ({ locals }) => {

  if (!locals.user) {
    throw redirect(302, "/auth/login")
  }
 
}) satisfies PageServerLoad

export const actions: Actions = {
  default: ({ cookies }) => {
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    })

    // redirect the user
    redirect(302, "/posts")
  },
}
