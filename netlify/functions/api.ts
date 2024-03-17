// Import required modules
import express from "express" // Express.js framework for handling HTTP requests
import serverless from "serverless-http" // Library for deploying Express.js apps to serverless platforms
import dotenv from "dotenv" // Library for loading environment variables from a .env file
import mongoose from "mongoose" // MongoDB ODM (Object Data Modeling) library for Node.js
import cors from "cors" // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import noteRoutes from "./routes/noteRoutes" // Importing router module for note-related routes

// Load environment variables from .env file into process.env
dotenv.config()

// Create an instance of the Express application
const api = express()

// Enable CORS middleware to allow cross-origin requests
api.use(cors())

// Parse incoming request bodies as JSON
api.use(express.json())

// MongoDB connection
if (process.env.MONGO_URL) mongoose.connect(process.env.MONGO_URL) // Connect to MongoDB using the provided connection URI
const db = mongoose.connection // Get the default Mongoose connection
db.on("error", console.error.bind(console, "MongoDB connection error:")) // Event listener for MongoDB connection errors
db.once("open", () => {
  // Event listener for successful MongoDB connection
  console.log("Connected to MongoDB")
})

// Mount the noteRoutes router at the /api/ path
api.use("/api/", noteRoutes)

// Export the Express application wrapped with serverless-http for deployment
export const handler = serverless(api)
