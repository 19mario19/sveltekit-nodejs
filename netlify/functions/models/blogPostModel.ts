import { Schema, Document, model } from "mongoose"
import { BlogCategory, Author, PersonName } from "../types"

interface IBlogPostDocument extends Document {
  title: string
  subtitle: string
  content: {
    subheading?: string
    subtitle?: string
    description?: string
    image?: string
    quote?: {
      content: string
      author: string
    }
    ul?: string[]
    ol?: string[]
  }[]
  category: BlogCategory
  author: Author
  createdAt?: Date
  updatedAt?: Date
}

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: [
      {
        subheading: { type: String },
        subtitle: { type: String },
        description: { type: String },
        image: { type: String },
        quote: {
          content: { type: String },
          author: { type: String },
        },
        ul: [{ type: String }],
        ol: [{ type: String }],
      },
    ],
    category: {
      type: String,
      enum: Object.values(BlogCategory),
      required: true,
    },
    author: {
      name: { type: String, enum: Object.values(PersonName), required: true },
      description: { type: String, required: true },
    },
  },
  { timestamps: true },
)


const BlogPostModel = model<IBlogPostDocument>("BlogPost", blogPostSchema)

export { BlogPostModel, IBlogPostDocument }
