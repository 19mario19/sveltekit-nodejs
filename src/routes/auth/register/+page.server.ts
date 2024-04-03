import type { Action, Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import bcrypt from "bcrypt"

import { UserRole, type User } from "$lib/types"
import { UserModel } from "$lib/db/models/UserModel"

export const load = (async ({ locals }) => {
  // TO DO
  if (locals.user) {
    redirect(302, "/")
  }
}) satisfies PageServerLoad

const register: Action = async ({ request, cookies }) => {
  const data = await request.formData()
  const name = data.get("name")
  const password = data.get("password")

  if (
    typeof name !== "string" ||
    typeof password !== "string" ||
    !name ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  // Searching if the user already exists
  const user = await UserModel.findOne({ name })
  if (user) {
    return fail(400, { user: true })
  }

  // If the user does not exist, we create a new one
  const hashedPassword = await bcrypt.hash(password, 10)
  const userAuthToken = crypto.randomUUID()

  const newUser = await UserModel.create({
    name,
    password: hashedPassword,
    userAuthToken,
    role: UserRole.USER,
  })

  // Set session cookie
  if (newUser) {
    cookies.set("session", userAuthToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    })

    // Redirect to home
    throw redirect(303, "/posts")
  } else {
    throw new Error("Failed to create user")
  }
}

export const actions: Actions = { register }