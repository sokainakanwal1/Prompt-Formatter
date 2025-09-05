import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { formatPromptSchema, type FormatPromptResponse } from '../shared/schema';

const ai = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_GEMINI_KEY || process.env.GEMINI_API_KEY || "" 
});

async function formatPrompt(originalPrompt: string): Promise<string> {
  try {
    const systemPrompt = `Act like a professional prompt formatter. You specialize in rewriting prompts for ChatGPT to make them clearer, structured, and more effective.

Your objective: Take the given raw prompt and transform it into a polished version that improves clarity, removes ambiguity, and ensures richer, more detailed outputs.

Follow these steps:
1. Identify the original intent of the user's raw prompt.
2. Define a clear role/persona for ChatGPT that aligns with the task.
3. Add context and constraints that guide ChatGPT to produce higher-quality responses.
4. Break the instructions into a structured, step-by-step format.
5. Specify the desired format of the output (length, structure, style, or bullet points).
6. Ensure the final prompt is concise, precise, and free from ambiguity.
7. End the formatted prompt with: "Take a deep breath and work on this problem step-by-step."

Output: Return ONLY the upgraded prompt inside a code block, without explanations or extra text.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      },
      contents: originalPrompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error("No response from Gemini");
    }

    // Extract content from code block if present
    const codeBlockMatch = result.match(/```[\s\S]*?\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }

    return result.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to format prompt. Please try again.");
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = formatPromptSchema.parse(req.body);
    
    const formattedPrompt = await formatPrompt(prompt);
    
    const response: FormatPromptResponse = {
      formattedPrompt,
      success: true,
    };
    
    res.json(response);
  } catch (error) {
    console.error("Format error:", error);
    
    const response: FormatPromptResponse = {
      formattedPrompt: "",
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
    
    res.status(500).json(response);
  }
}
