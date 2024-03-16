import express, { Router } from "express"
import serverless from "serverless-http"

const api = express()

const router = Router()
router.get("/hello", (req, res) => {
    return res.status(200).json({message: "Hello there!"})
})

api.use("/api/", router)

export const handler = serverless(api)
