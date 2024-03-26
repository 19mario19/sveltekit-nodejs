import { Schema, Document, model } from "mongoose"
import { BlogCategory, Author, PersonName } from "../types"

interface IBlogPostDocument extends Document {
  title: string
  subtitle: string
  mainImage?: string
  content: {
    subheading?: string
    subtitle?: string
    description?: string
    image?: string
    quote?: {
      content: string
      author: string
    }
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
    mainImage: { type: String , required: true },
    content: [
      {
        subheading: { id: { type: Number }, type: String },
        subtitle: { id: { type: Number }, type: String },
        description: { id: { type: Number }, type: String },
        image: { id: { type: Number }, type: String },
        quote: {
          id: { type: Number },
          content: { type: String },
          author: { type: String },
        },
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
