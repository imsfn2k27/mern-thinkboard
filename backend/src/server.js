import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json()); //This middleware will parse JSON bodies: req.body
app.use(ratelimiter);

app.use("/api/notes", notesRoutes);

// mongodb+srv://<db_username>:c7G4NzGZhr8wLsRq@cluster0.m995aji.mongodb.net/
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server satrted on PORT: ", PORT);
  });
});
