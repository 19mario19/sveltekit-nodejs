import { Request, Response } from "express"
import { NoteModel, INoteDocument } from "../models/noteModel"

async function getNotes(_req: Request, res: Response) {
  try {
    const notes = await NoteModel.find().sort({ createdAt: -1 })
    return res.status(200).json({ notes })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function getNote(req: Request, res: Response) {
  const { id } = req.params
  try {
    const note = await NoteModel.findById(id)
    if (!note) {
      return res.status(404).json({ error: "Note not found" })
    }
    return res.status(200).json({ note })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function createNote(req: Request, res: Response) {
  try {
    const { name } = req.body
    const newNote = await NoteModel.create({ name })
    return res.status(200).json({ note: newNote })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export { getNotes, getNote, createNote }
