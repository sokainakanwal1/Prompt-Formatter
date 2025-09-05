import type { Express } from "express";
import { createServer, type Server } from "http";
import { formatPromptSchema, type FormatPromptResponse } from "@shared/schema";
import { formatPrompt } from "./lib/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Format prompt endpoint
  app.post("/api/format", async (req, res) => {
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
  });

  // Dynamic Open Graph image generation
  app.get("/api/og", async (req, res) => {
    try {
      // Simple SVG-based Open Graph image
      const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:hsl(346, 100%, 65%);stop-opacity:1" />
              <stop offset="100%" style="stop-color:hsl(340, 82%, 52%);stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#grad)"/>
          <text x="600" y="280" font-family="Inter, sans-serif" font-size="60" font-weight="bold" text-anchor="middle" fill="white">
            Prompt Formatter &amp; Expander
          </text>
          <text x="600" y="350" font-family="Inter, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)">
            Free ChatGPT Prompt Optimizer
          </text>
          <text x="600" y="420" font-family="Inter, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)">
            Transform messy prompts into professional AI instructions
          </text>
        </svg>
      `;

      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.send(svg);
    } catch (error) {
      console.error("OG image error:", error);
      res.status(500).send("Error generating image");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
