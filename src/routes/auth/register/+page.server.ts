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
  const authenticatedUser = await UserModel.create(
    {
      name,
      password: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: UserRole.USER,
    },
    {
      new: true,
    },
  )

  if (authenticatedUser) {
    cookies.set("session", (authenticatedUser as any).userAuthToken, {
      // send cookie for every page
      path: "/",
      // server side only cookie so you can't use `document.cookie`
      httpOnly: true,
      // only requests from same site can send cookies
      // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
      sameSite: "strict",
      // only sent over HTTPS in production
      secure: process.env.NODE_ENV === "production",
      // set cookie to expire after a month
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  throw redirect(303, "/auth/login")
}

export const actions: Actions = { register }
