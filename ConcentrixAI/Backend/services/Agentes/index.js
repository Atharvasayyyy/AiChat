import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import router from "./routes/agent.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;  

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/", router);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Agentes Server is running on port ${PORT}`);
  connectDB();
});
