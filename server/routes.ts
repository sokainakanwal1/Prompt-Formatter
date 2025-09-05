import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { formatPrompt } from "./gemini";
import { z } from "zod";
import helmet from "helmet";
import cors from "cors";
import express from "express";

const formatRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required").max(1000, "Prompt must be under 1000 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Security middleware with development-friendly CSP
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'", // Allow inline scripts for Vite development
          "'unsafe-eval'", // Allow eval for development
          "replit.com",
          "*.replit.com",
          "replit.dev",
          "*.replit.dev"
        ],
        styleSrc: [
          "'self'", 
          "'unsafe-inline'", // Allow inline styles
          "fonts.googleapis.com"
        ],
        fontSrc: [
          "'self'",
          "fonts.gstatic.com",
          "fonts.googleapis.com"
        ],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: [
          "'self'", 
          "ws:", 
          "wss:", 
          "*.replit.com",
          "*.replit.dev"
        ]
      }
    }
  }));
  app.use(cors({
    origin: "*",
    credentials: true
  }));

  // Body size limit for prompt formatting
  app.use(express.json({ limit: '10kb' }));

  // Format prompt endpoint
  app.post("/api/format", async (req, res) => {
    try {
      const parseResult = formatRequestSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(422).json({
          error: "Invalid request",
          details: parseResult.error.errors
        });
      }

      const { prompt } = parseResult.data;
      
      const formattedPrompt = await formatPrompt(prompt);
      
      res.json({
        formatted: formattedPrompt
      });
    } catch (error) {
      console.error("Prompt formatting error:", error);
      res.status(422).json({
        error: "Failed to format prompt",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
