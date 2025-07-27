import { ChatModel } from "../domain/ChatModel";
import { ChatMemory } from "../domain/ChatMemory";

export class ChatService {
  constructor(
    private readonly chatModel: ChatModel,
    private readonly chatMemory: ChatMemory
  ) {}

  async handleMessage(userId: string, message: string, systemPrompt: string) {
    const memory = await this.chatMemory.getMemory(userId);

    const messages = [
      { role: "system", content: systemPrompt },
      ...(memory?.history || []),
      { role: "user", content: message },
    ];

    const result = await this.chatModel.sendMessage({ messages, memory });

    await this.chatMemory.saveMemory(userId, {
      history: [
        ...(memory?.history || []),
        { role: "user", content: message },
        { role: "assistant", content: result.response },
      ],
    });

    return result.response;
  }
}