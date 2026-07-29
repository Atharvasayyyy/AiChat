import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
dotenv.config();
import router from "./routes/chat.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;  

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/",router);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Chat Server is running on port ${PORT}`);
  connectDB();
});
