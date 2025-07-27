// import { LangChainChatGptAdapter } from "../features/chat/infrastructure/adapters/LangChainChatGptAdapter";
import { LangChainOllamaAdapter } from "../features/chat/infrastructure/adapters/LangChainOllamaAdapter";
import { MemoryInMemoryAdapter } from "../features/chat/infrastructure/adapters/MemoryInMemoryAdapter";
import { ChatService } from "../features/chat/application/ChatService";

export const container = new Map();

// container.set("ChatModel", new LangChainChatGptAdapter(process.env.OPENAI_API_KEY!));
container.set("ChatModel", new LangChainOllamaAdapter());