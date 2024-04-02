import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async () => {
  // Page is not created, this is just for the API
  // redirect(303, "/")
}) satisfies PageServerLoad

export const actions: Actions = {
  logout: ({ cookies }) => {
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    })

    // redirect the user
    redirect(302, "/posts")
  },
}
