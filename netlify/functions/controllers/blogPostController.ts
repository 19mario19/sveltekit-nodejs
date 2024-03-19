import { Request, Response } from "express"
import { BlogPostModel, IBlogPostDocument } from "../models/blogPostModel"
import { BlogPost } from "../types"

async function getBlogPosts(_req: Request, res: Response) {
  try {
    const blogPosts = await BlogPostModel.find().sort({ createdAt: -1 })
    return res.status(200).json({ blogPosts })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function getBlogPost(req: Request, res: Response) {
  const { id } = req.params
  try {
    const blogPost = await BlogPostModel.findById(id)
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" })
    }
    return res.status(200).json({ blogPost })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function createBlogPost(req: Request, res: Response) {
  try {
    const { title, subtitle, content, category, author }: BlogPost = req.body

    const newBlogPost = await BlogPostModel.create({
      title,
      subtitle,
      content,
      category,
      author,
    })

    return res.status(200).json({ blogPost: newBlogPost })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export { getBlogPosts, getBlogPost, createBlogPost }
