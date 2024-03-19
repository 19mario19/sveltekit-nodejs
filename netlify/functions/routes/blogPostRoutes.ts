import { Router } from "express"
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
} from "../controllers/blogPostController"

const router = Router()

router.get("/blog-posts", getBlogPosts)
router.get("/blog-posts/:id", getBlogPost)
router.post("/blog-posts", createBlogPost)

export default router
