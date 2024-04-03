import { UserModel } from "$lib/db/models/UserModel"
import type { User } from "$lib/types"
import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import bcrypt from "bcrypt"

export const load = (async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/auth/login")
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  default: async ({ cookies }) => {
    
    // If the user does not exist, we create a new one
    await UserModel.findOneAndUpdate(
      { userAuthToken: cookies.get("session") },
      { $set: { userAuthToken: crypto.randomUUID() } },
    )

    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    })

    // redirect the user
    redirect(302, "/posts")
  },
}
