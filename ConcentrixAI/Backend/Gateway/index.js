import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import { getcurrentuser } from "./controller/user.controller.js";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(cors({
  origin: process.env.Frontend_URL,
  credentials: true
}));

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/me", protect, getcurrentuser);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
