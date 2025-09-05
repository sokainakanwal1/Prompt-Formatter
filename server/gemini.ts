import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || "" 
});

const SYSTEM_PROMPT = `Act like a professional prompt formatter. You specialize in rewriting prompts for ChatGPT to make them clearer, structured, and more effective.

Your objective: Take the given raw prompt and transform it into a polished version that improves clarity, removes ambiguity, and ensures richer, more detailed outputs.

Follow these steps:
1. Identify the original intent of the user's raw prompt.
2. Define a clear role/persona for ChatGPT that aligns with the task.
3. Add context and constraints that guide ChatGPT to produce higher-quality responses.
4. Break the instructions into a structured, step-by-step format.
5. Specify the desired format of the output (length, structure, style, or bullet points).
6. Ensure the final prompt is concise, precise, and free from ambiguity.
7. End the formatted prompt with: "Take a deep breath and work on this problem step-by-step."

Output: Return ONLY the upgraded prompt, without explanations or extra text.`;

export async function formatPrompt(rawPrompt: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY && !process.env.GEMINI_KEY) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: rawPrompt }],
        },
      ],
    });

    // Fix: Access the text from the correct response structure
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No response candidates from Gemini model");
    }

    const firstCandidate = candidates[0];
    if (!firstCandidate.content || !firstCandidate.content.parts || firstCandidate.content.parts.length === 0) {
      throw new Error("No content parts in response candidate");
    }

    const textPart = firstCandidate.content.parts[0];
    if (!textPart.text) {
      throw new Error("No text in response part");
    }

    return textPart.text.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("Invalid or missing API key");
      }
      if (error.message.includes("quota")) {
        throw new Error("API quota exceeded");
      }
      if (error.message.includes("rate limit")) {
        throw new Error("Rate limit exceeded, please try again later");
      }
    }
    
    throw new Error("Failed to format prompt with AI service");
  }
}
