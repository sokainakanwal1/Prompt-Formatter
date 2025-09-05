import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

// Define types inline to avoid import issues
interface FormatPromptResponse {
  formattedPrompt: string;
  success: boolean;
  error?: string;
}

// Gemini logic embedded directly
async function formatPrompt(originalPrompt: string): Promise<string> {
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GOOGLE_GEMINI_KEY || process.env.GEMINI_API_KEY || "" 
  });

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
      model: "gemini-1.5-flash", // Using more stable model name
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
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate API key
    if (!process.env.GOOGLE_GEMINI_KEY && !process.env.GEMINI_API_KEY) {
      console.error('Missing Gemini API key');
      return res.status(500).json({
        formattedPrompt: "",
        success: false,
        error: "Server configuration error"
      });
    }

    // Validate request body
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        formattedPrompt: "",
        success: false,
        error: "Invalid request body"
      });
    }
    
    if (!req.body.prompt || typeof req.body.prompt !== 'string') {
      return res.status(400).json({
        formattedPrompt: "",
        success: false,
        error: "Prompt is required and must be a string"
      });
    }
    
    if (req.body.prompt.length === 0) {
      return res.status(400).json({
        formattedPrompt: "",
        success: false,
        error: "Prompt cannot be empty"
      });
    }
    
    if (req.body.prompt.length > 5000) {
      return res.status(400).json({
        formattedPrompt: "",
        success: false,
        error: "Prompt too long (max 5000 characters)"
      });
    }

    const formattedPrompt = await formatPrompt(req.body.prompt);
    
    const response: FormatPromptResponse = {
      formattedPrompt,
      success: true,
    };
    
    return res.json(response);
  } catch (error) {
    console.error("Format error:", error);
    
    const response: FormatPromptResponse = {
      formattedPrompt: "",
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
    
    return res.status(500).json(response);
  }
}
