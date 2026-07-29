import express from "express";
const router = express.Router();
import {
  creatconversation,
  getconversations,
    updateconversations,
    saveMassage,
    getMessages
} from "../controller/chat.controller.js";


router.get("/creat-conversations", creatconversation);

router.get("/get-conversations", getconversations);

router.post("/update-conversations", updateconversations);

router.post("/save-message", saveMassage);

router.get("/get-messages/:conversationId", getMessages);


export default router;