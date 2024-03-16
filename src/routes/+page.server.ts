import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const res = await fetch("/api/")
  const { notes } = await res.json()

  const res1 = await fetch("/api/1")
  const { note } = await res1.json()
  console.log(note)

  return { notes, note }
}) satisfies PageServerLoad
