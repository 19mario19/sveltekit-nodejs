import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const res = await fetch("/api/notes/")
  const { notes } = await res.json()

  const res1 = await fetch("/api/notes/65f69103cc8e652a18b2e6d0")
  const { note } = await res1.json()
  console.log(note)

  return { notes, note }
}) satisfies PageServerLoad
