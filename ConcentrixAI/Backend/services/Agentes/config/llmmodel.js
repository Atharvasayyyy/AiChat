
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const groq = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile"
});

const Gemini = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-1.5-flash",
    temperature: 0,
    maxRetries: 2,
})

export const getmodel=(agent)=>{
    switch(agent){
        case "chat":
            return groq
        case "search":
            return Gemini
        case "coding":
            return groq
        case "ppt":
            return groq
        case "Vision":
            return Gemini
        case "pdf":
            return Gemini
        default:
            return groq
    }
}