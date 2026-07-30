import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";

import {router} from "./Router.js";
import { chatAgent } from "../Agent/chate.agent.js";
import { searchAgent } from "../Agent/serch.agent.js";
import { CoddingAgent } from "../Agent/codding.agent.js";
import { pptAgent } from "../Agent/ppt.agent.js";
import { VisionAgent } from "../Agent/vision.js";
import { pdfAgent } from "../Agent/pdf.agent.js";


const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("coding", CoddingAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("vision", VisionAgent);
workflow.addNode("pdf", pdfAgent);

workflow.addEdge("__start__", "router");

workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
      case "search":
        return "search";
      case "coding":
        return "coding";
      case "ppt":
        return "ppt";
      case "vision":
        return "vision";
      case "pdf":
        return "pdf";
      default:
        return "chat";
    }
  },
  {
    chat: "chat",
    search: "search",
    coding: "coding",
    ppt: "ppt",
    vision: "vision",
    pdf: "pdf",
  }
);

workflow.addEdge("search", "chat");

workflow.addEdge("chat", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("vision", "__end__");
workflow.addEdge("pdf", "__end__");

export const graph = workflow.compile();