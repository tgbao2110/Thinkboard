import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes); // Use the notes routes for all requests to /api/notes

// Connect DB and run
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
