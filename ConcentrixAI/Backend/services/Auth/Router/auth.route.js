import express from "express";
const router = express.Router();   
// const { login } = require("../Controller/auth.controller");
import { login, logout } from "../Controller/auth.controller.js";

router.post("/login", login);
router.get("/logout", logout);

export default router;