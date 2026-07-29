import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./Router/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());
app.use("/",router);

app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}`);
  connectDB();
});
