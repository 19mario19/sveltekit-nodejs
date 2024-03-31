import mongoose from "mongoose"
import { MONGO_URL } from "$env/static/private"

async function connectMongoDB() {
  console.log("Starting mongo...")
  try {
    await mongoose.connect(MONGO_URL)
    console.log("MongoDB connected successfully")
  } catch (err) {
    console.error("MongoDB connection error:", err)
    throw err
  }
}

export { connectMongoDB }
