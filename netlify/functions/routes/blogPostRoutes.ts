import { Router } from "express"
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  removeBlogPost,
} from "../controllers/blogPostController"

const router = Router()

router.get("/blog-posts/:id", getBlogPost)
router.get("/blog-posts", getBlogPosts)
router.post("/blog-posts", createBlogPost)
router.delete("/blog-posts/:id", removeBlogPost)

export default router
