import { connectMongoDB } from "$lib/db/db"

async function startServer() {
  try {
    await connectMongoDB()
    console.log("Connected successfully to MongoDB")
  } catch (error) {
    console.error("Error starting server:", error)
  }
}

startServer()
