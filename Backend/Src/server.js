import express from "express";
import notesRouter from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import { ratelimiter } from "./middleware/ratelimiter.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ratelimiter);
app.use("/api/notes", notesRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}
)
