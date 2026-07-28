import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./Router/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());
app.use("/",router);

app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}`);
  connectDB();
});
