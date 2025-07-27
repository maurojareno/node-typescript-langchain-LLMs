import { ChatModel } from "../../domain/ChatModel";
// Import actualizado para ChatOpenAI
import { ChatOpenAI } from "@langchain/openai";
// Mensajes base desde core

export class LangChainChatGptAdapter implements ChatModel {
  private model: ChatOpenAI;

  constructor(apiKey: string, modelName: string = "gpt-3.5-turbo") {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName,
      temperature: 0.7,
    });
  }

  async sendMessage({ messages }: { messages: any[]; memory?: any; options?: any }): Promise<{ response: string }> {
    const lcMessages = messages.map(m => {
      if (m.role === "system") return { role: "system", content: m.content };
      if (m.role === "user") return { role: "user", content: m.content };
      if (m.role === "assistant") return { role: "assistant", content: m.content };
      throw new Error("Rol desconocido");
    });

    // invoke() es el método nuevo recomendado
    const res = await this.model.invoke(lcMessages);
    // Ensure the response is always a string
    let responseContent: string;
    if (typeof res.content === "string") {
      responseContent = res.content;
    } else if (Array.isArray(res.content)) {
      responseContent = res.content.map((c: any) => typeof c === "string" ? c : c.text ?? "").join(" ");
    } else {
      responseContent = "";
    }
    return { response: responseContent };
  }
}
