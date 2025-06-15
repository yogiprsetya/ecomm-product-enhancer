import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

export const generateResponse = async (prompt: string) => {
  try {
    const model = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return model.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
};
