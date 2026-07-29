import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';


export const creatconversation = async (req, res) => {
    try{
        const userId = req.headers['user-id'];
        console.log("userId", userId);
        const conversation = await Conversation.create({ userId: userId });
        res.status(201).json(conversation);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "create conversation Internal Server Error" });
    }
}


export const getconversations = async (req, res) => {
    try{
        const userId = req.headers['user-id'];
        console.log("userId", userId);
        const conversations = await Conversation.find({ userId: userId }).sort({ updatedAt: -1 });
        res.status(201).json(conversations);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "get conversations Internal Server Error" });
    }
}


export const updateconversations = async (req, res) => {
    try{
        const {id, title} = req.body;
        if (!id || !title) {
            return res.status(400).json({ message: "id and title are required" });
        }
        const conversations = await Conversation.findByIdAndUpdate(id, { title });
        res.status(201).json(conversations);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "update conversations Internal Server Error" });
    }
}

export const saveMassage= async (req, res) => {
    try{
        const {conversationId,role,content} = req.body;
        if (!conversationId || !role || !content) {
            return res.status(400).json({ message: "conversationId, role and content are required" });
        }
        const message= await Message.create({ conversationId, role, content });
        res.status(201).json(message);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "save message Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try{
        const {conversationId} = req.params;    
        if (!conversationId) {
            return res.status(400).json({ message: "conversationId is required" });
        }
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        res.status(201).json(messages);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "get messages Internal Server Error" });
    }
}

