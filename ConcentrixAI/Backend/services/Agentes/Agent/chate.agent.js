import { getmodel } from "../config/llmmodel.js";

export const chatAgent = async (state) => {
    const llm = await getmodel("chat");
    const Systemprompt = `You are a helpful assistant. Answer the following question in detail`;
    const response = await llm.invoke([
        {
            role: "system",
            content: Systemprompt,
        },
        {
            role: "human",
            prompt: state.prompt,
    }
])

return {
    ...state,
    aiResponse: response.content,
};
}

