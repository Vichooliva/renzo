
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "MISSING_API_KEY" });

export const askLegalQuestion = async (question: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
            config: {
                systemInstruction: "Eres un asistente legal experto para la corporación Empresas SB. Tu propósito es dar respuestas claras, concisas y orientativas sobre consultas legales internas. No proporcionas asesoramiento legal definitivo, sino información preliminar. Basa tus respuestas en principios legales generales de Chile. Sé profesional y directo.",
                temperature: 0.5,
                topP: 1,
                topK: 32,
            },
        });
        
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return `Lo siento, ha ocurrido un error al procesar tu solicitud: ${error.message}`;
        }
        return "Lo siento, ha ocurrido un error desconocido al procesar tu solicitud.";
    }
};
