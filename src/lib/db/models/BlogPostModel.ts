import { Schema, model } from "mongoose"
import { BlogCategory, type Author, PersonName } from "$lib/types"


const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    mainImage: { type: String, required: true },
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

const BlogPostModel = model("BlogPost", blogPostSchema)

export { BlogPostModel }
