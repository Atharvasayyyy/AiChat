import express from "express";
const router = express.Router();   
// const { login } = require("../Controller/auth.controller");
import { login } from "../Controller/auth.controller.js";

router.post("/login", login);

export default router;