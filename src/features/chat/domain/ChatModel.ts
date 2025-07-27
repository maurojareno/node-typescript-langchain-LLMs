export interface ChatModel {
  sendMessage(params: {
    messages: { role: "system" | "user" | "assistant", content: string }[];
    memory?: any;
    options?: any;
  }): Promise<{ response: string, memory?: any }>;
}