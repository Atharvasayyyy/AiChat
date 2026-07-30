import express from "express";
const router = express.Router();
import { agent } from "../controller/agent.controller.js";

router.post("/chat",agent)

export default router;