import mongoose, { Schema, Document, model } from "mongoose"

interface INoteDocument extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

const noteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const NoteModel = model<INoteDocument>("Note", noteSchema)

export { NoteModel, INoteDocument }
