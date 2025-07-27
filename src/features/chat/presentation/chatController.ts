import { Request, Response, Router } from "express";
import { LangChainOllamaAdapter } from "../infrastructure/adapters/LangChainOllamaAdapter";
// import { ChatService } from "../application/ChatService";
// import { container } from "../../../shared/di";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { message, systemPrompt, userId } = req.body;
  //const chatService: ChatService = container.get("ChatService");
  //TODO: implement abstraccion
  const chatService = new LangChainOllamaAdapter();
  try {
    const response = await chatService.getGymExercises(
        message
    );
    res.json({ response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error interno" });
  }
  //   try {
  //     const response = await chatService.handleMessage(
  //       userId || "default",
  //       message,
  //       systemPrompt || "Eres un asistente útil."
  //     );
  //     res.json({ response });
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).json({ error: "Error interno" });
  //   }
});

export default router;
