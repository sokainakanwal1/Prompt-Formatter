import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { formatPrompt } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Copy, Wand2, Check } from "lucide-react";

interface PromptFormatterProps {
  className?: string;
}

export default function PromptFormatter({ className }: PromptFormatterProps) {
  const [inputPrompt, setInputPrompt] = useState("");
  const [formattedPrompt, setFormattedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatMutation = useMutation({
    mutationFn: formatPrompt,
    onSuccess: (data) => {
      setFormattedPrompt(data.formatted);
      toast({
        title: "Prompt formatted successfully!",
        description: "Your enhanced prompt is ready to use.",
      });
    },
    onError: (error) => {
      toast({
        title: "Formatting failed",
        description: error.message || "Unable to format prompt. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormat = () => {
    if (!inputPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to format.",
        variant: "destructive",
      });
      return;
    }

    if (inputPrompt.length > 1000) {
      toast({
        title: "Prompt too long",
        description: "Please keep your prompt under 1000 characters.",
        variant: "destructive",
      });
      return;
    }

    formatMutation.mutate(inputPrompt);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedPrompt);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "The formatted prompt is ready to use.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center" data-testid="text-formatter-title">
            Format Your Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-foreground mb-2">
              Enter your raw prompt
            </label>
            <Textarea 
              id="prompt-input"
              data-testid="input-raw-prompt"
              placeholder="Paste your prompt here... For example: 'write me a blog post about artificial intelligence'"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="h-32 resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1" data-testid="text-char-count">
              {inputPrompt.length}/1000 characters
            </p>
          </div>

          {/* Format Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleFormat}
              disabled={formatMutation.isPending || !inputPrompt.trim()}
              className="px-8 py-3"
              data-testid="button-format-prompt"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {formatMutation.isPending ? "Formatting..." : "Format Prompt"}
            </Button>
          </div>

          {/* Loading State */}
          {formatMutation.isPending && (
            <div className="bg-muted rounded-md p-4" data-testid="formatter-loading">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <p className="text-center text-muted-foreground mt-2">Formatting your prompt...</p>
            </div>
          )}

          {/* Output Section */}
          {formattedPrompt && !formatMutation.isPending && (
            <div data-testid="formatter-output">
              <label className="block text-sm font-medium text-foreground mb-2">
                Formatted Prompt
              </label>
              <div className="relative">
                <Textarea 
                  id="prompt-output"
                  data-testid="output-formatted-prompt"
                  value={formattedPrompt}
                  readOnly
                  className="h-48 bg-muted resize-none"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopy}
                  className="absolute top-3 right-3"
                  data-testid="button-copy-formatted"
                >
                  {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1" data-testid="text-usage-instruction">
                Click copy to use this formatted prompt with ChatGPT
              </p>
            </div>
          )}

          {/* Error Display */}
          {formatMutation.isError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4" data-testid="formatter-error">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-destructive-foreground text-xs">!</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-destructive">Formatting Error</h3>
                  <p className="text-sm text-destructive/80" data-testid="text-error-message">
                    {formatMutation.error?.message || "Unable to format prompt. Please try again."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
