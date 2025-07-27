export interface ChatMemory {
  getMemory(userId: string): Promise<any>;
  saveMemory(userId: string, memory: any): Promise<void>;
}