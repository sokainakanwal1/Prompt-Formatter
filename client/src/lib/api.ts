import { apiRequest } from "./queryClient";

export interface FormatPromptRequest {
  prompt: string;
}

export interface FormatPromptResponse {
  formatted: string;
}

export async function formatPrompt(prompt: string): Promise<FormatPromptResponse> {
  const response = await apiRequest("POST", "/api/format", { prompt });
  return response.json();
}
