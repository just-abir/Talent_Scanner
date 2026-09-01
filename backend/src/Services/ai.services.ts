import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const invokeGeminiAi = async () => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: "Explain how AI works in a few words",
  });

  console.log(interaction.output_text);
};

export default invokeGeminiAi;
