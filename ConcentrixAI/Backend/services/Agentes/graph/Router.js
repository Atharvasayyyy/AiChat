import { getmodel } from "../config/llmmodel.js";

export const router = async (state) => {
  const llm = await getmodel("router");

  const prompt = `
You are a helpful routing agent.

Available agents:
- chat
- search
- coding
- ppt
- vision
- pdf

Your task is to select the single best agent based on the user's query.

Agent descriptions:
- chat: general conversation, explanations, learning, questions
- search: latest information, news, current events, recent developments
- coding: code generation, debugging, software development, API development, code review
- pdf: PDF-related questions, document context, PDF generation
- ppt: presentation-related questions, PPT generation
- vision: image-related questions

Return only one of these words:
chat
search
coding
pdf
ppt
vision

Do not return any explanation.

User Query:
${state.prompt}
`;

  const response = await llm.invoke(prompt);

  const agent = response.content.trim().toLowerCase();

  console.log("Router response:", agent);

  return {
    ...state,
    agent:response.content.trim().toLowerCase(),
  };
};