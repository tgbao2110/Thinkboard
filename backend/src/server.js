import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/notes", notesRoutes); // Use the notes routes for all requests to /api/notes

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});