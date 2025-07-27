import { Ollama } from "@langchain/community/llms/ollama";
import {
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export class LangChainOllamaAdapter {
  private readonly gymExercises = [
    "Peso muerto rumano",
    "Sentadilla libre",
    "Press militar con barra",
    "Press de banca con barra",
    "Apertura con mancuernas",
    "Vuelos laterales",
    "Remo con barra",
    "Dominadas",
    "Fondos en paralelas",
    "Curl de bíceps con barra",
    "Extensión de tríceps en polea alta",
  ];

  async getGymExercises(message: string[]): Promise<string> {
    // Crea los templates por separado
    const userPrompt = PromptTemplate.fromTemplate(`{message}`);
    const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
      `* Actúas como un recomendador de ejercicios de gimnasio avanzado.
     * Solo debes sugerir ejercicios de la siguiente lista (IMPORTANTE: no incluyas ejercicios que no estén en la lista):
     ${this.gymExercises
       .map((gymExcercise) => `\t- ${gymExcercise}`)
       .join("\n")}
     * Devuelve únicamente el listado de los ejercicios recomendados segun el mensaje del usuario, utilizando formato de lista en markdown.
     * Mantén la respuesta centrada en la recomendación, sin añadir agradecimientos o comentarios adicionales.
     * Asegúrate de que los ejercicios recomendados sean relevantes para el progreso del usuario, basándote en la pregunta que se hace.
     * Devuelve los ejercicios en castellano.
     * No puedes añadir ejercicios que el usuario no pide.
     * Devuelve sólo los nombres de los ejercicios, sin añadir información adicional.`
    );

    // Formatea ambos mensajes
    const formattedUser = await userPrompt.format({ message });
    const formattedSystem = await systemPrompt.format({});

    // Loguea el prompt completo que va a enviar al modelo
    console.log("=== PROMPT ENVIADO AL MODELO ===");
    console.log("[system]:", formattedSystem);
    console.log("[user]:", formattedUser);

    // Arma el chain como antes
    const chain = RunnableSequence.from([
      userPrompt,
      systemPrompt,
      new Ollama({
        model: "gemma",
        temperature: 0,
      }),
    ]);

    return await chain.invoke({
      message,
    });
  }
}
