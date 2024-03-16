import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const res = await fetch("/api/hello")
  const { message } = await res.json()

  const res1 = await fetch("/api/test")
  const { message: mssg } = await res1.json()

  return { message, mssg }
}) satisfies PageServerLoad
