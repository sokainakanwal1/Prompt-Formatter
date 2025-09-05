// API Types
export interface FormatPromptRequest {
  prompt: string;
}

export interface FormatPromptResponse {
  formattedPrompt: string;
  success: boolean;
  error?: string;
}
