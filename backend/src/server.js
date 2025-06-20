import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

// Middleware
app.use(express.json()) // Middleware to parse JSON bodies
app.use(rateLimiter)

// Routes
app.use("/api/notes", notesRoutes) // Use the notes routes for all requests to /api/notes

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})