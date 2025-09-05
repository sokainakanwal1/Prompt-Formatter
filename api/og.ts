import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
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
}
