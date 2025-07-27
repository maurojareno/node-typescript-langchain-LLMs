import { ChatMemory } from "../../domain/ChatMemory";

export class MemoryInMemoryAdapter implements ChatMemory {
  private store: Record<string, any> = {};

  async getMemory(userId: string): Promise<any> {
    return this.store[userId] || {};
  }

  async saveMemory(userId: string, memory: any): Promise<void> {
    this.store[userId] = memory;
  }
}
