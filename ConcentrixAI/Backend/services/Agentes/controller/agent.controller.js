import axios from "axios";
import { graph } from "../graph/graph.js";
export const agent =async (req, res)=>{
    try {
        const { prompt, conversationId } = req.body;

        await axios.post(`${process.env.ChatServiceurl}/save-message`, { 
            conversationId,
            content: prompt,
            role: "user"
        });

        const result = await graph.invoke({ 
            prompt, conversationId 
        });

        res.aiResponse = result.aiResponse;
        res.status(200).json({ aiResponse: result.aiResponse });

    }catch (error) {
        console.error("Error in agent controller:", error);
        res.status(500).json({ error: "Internal server error" });
        console.log ("Error in agent controller of the agent" )
    }
}