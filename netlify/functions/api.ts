import express, { Router } from "express"
import serverless from "serverless-http"

const api = express()

type Note = {
  id: string | number
  name: string
  createdAt: Date
}

const notes: Note[] = [
  {
    id: 1,
    name: "Meeting Agenda",
    createdAt: new Date("2024-03-16T08:00:00"),
  },
  {
    id: 2,
    name: "Shopping List",
    createdAt: new Date("2024-03-16T12:00:00"),
  },
  {
    id: 3,
    name: "Project Ideas",
    createdAt: new Date("2024-03-15T15:30:00"),
  },
  {
    id: 4,
    name: "Personal Journal",
    createdAt: new Date("2024-03-14T10:45:00"),
  },
  {
    id: 5,
    name: "Daily Reflections",
    createdAt: new Date("2024-03-13T18:20:00"),
  },
]

const router = Router()
router.get("/", (req, res) => {
  return res.status(200).json({ notes })
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  let note = notes.filter((el) => el.id == id)
  return res.status(200).json({ note })
})

api.use("/api/", router)

export const handler = serverless(api)
