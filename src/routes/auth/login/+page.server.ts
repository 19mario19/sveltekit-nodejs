import type { Action, Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import bcrypt from "bcrypt"
import type { User } from "$lib/types"

import { UserModel } from "$lib/db/models/UserModel"

export const load = (async ({ locals }) => {
  if (locals.user) {
    redirect(302, "/")
  }
}) satisfies PageServerLoad

const login: Action = async ({ request, cookies }) => {
  // Get the data from the form

  const data = await request.formData()
  const name = data.get("name")
  const password = data.get("password")

  // Check if the data is valid

  if (
    typeof name !== "string" ||
    typeof password !== "string" ||
    !name ||
    !password
  ) {
    // If not valid, throw an error named invalid
    return fail(400, { invalid: true })
  }

  // Check if the user exists
  const user = await UserModel.findOne({ name })

  // If the user does not exist, throw an error named user
  if (!user) {
    return fail(400, { credentials: true })
  }

  // Check if the password is correct, by comparing it to the hashed password
  // Passowrd is from the form, user.password is hashed password from the database
  const userPassword = await bcrypt.compare(password, user.password)

  // If the password is not correct, throw an error named credentials
  if (!userPassword) {
    return fail(400, { credentials: true })
  }

  // Generate new authorization token
  const authenticatedUser: User | null = await UserModel.findOneAndUpdate(
    { name },
    { $set: { userAuthToken: crypto.randomUUID() } },
    { new: true },
  )

  // Set session cookie
  if (authenticatedUser)
    cookies.set("session", authenticatedUser.userAuthToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    })

  // Redirect to home
  throw redirect(303, "/posts")
}

export const actions: Actions = { login }
