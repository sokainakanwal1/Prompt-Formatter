import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";
import { Wand2, Lightbulb, Copy, Check, Loader2, CheckCircle, Sparkles } from "lucide-react";
import type { FormatPromptRequest } from "@/types/api";

export default function PromptFormatter() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [formattedResult, setFormattedResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormat = async () => {
    if (!inputPrompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Type or paste your prompt to get started.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const payload: FormatPromptRequest = { prompt: inputPrompt };
      const response = await apiService.formatPrompt(payload);
      
      if (response.success) {
        setFormattedResult(response.formattedPrompt);
        toast({
          title: "Prompt formatted successfully!",
          description: "Your optimized prompt is ready to use.",
        });
      } else {
        toast({
          title: "Format failed",
          description: response.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Formatting error:', error);
      toast({
        title: "Error formatting prompt",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = () => {
    const examplePrompt = "help me write better emails for my business i want them to be more professional and get better responses from clients also make them shorter and easier to read on mobile devices and include some templates for common situations like follow ups and introductions this prompt formatter should help structure this better";
    setInputPrompt(examplePrompt);
    setFormattedResult("");
  };

  const copyToClipboard = async () => {
    if (!formattedResult) return;
    
    try {
      await navigator.clipboard.writeText(formattedResult);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Your formatted prompt is ready to paste.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <label htmlFor="original-prompt" className="text-xl sm:text-2xl font-bold text-foreground">
            Your Original Prompt
          </label>
        </div>
        <div className="relative">
          <Textarea
            id="original-prompt"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] resize-none text-base sm:text-lg leading-relaxed border-2 focus:border-purple-500/50 transition-all duration-200 rounded-2xl p-4 sm:p-6"
            placeholder="Paste your messy prompt here...\n\nExample: help me write better emails for my business i want them to be more professional and get better responses from clients also make them shorter and easier to read on mobile devices and include some templates for common situations like follow ups and introductions this prompt formatter should help structure this better"
            data-testid="input-prompt"
          />
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-lg border">
            {inputPrompt.length}/5000
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-200 dark:border-blue-800">
          <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          <span className="font-medium">Tip:</span> Be as detailed as possible for better formatting results
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Button
          onClick={handleFormat}
          disabled={isLoading || !inputPrompt.trim()}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 sm:py-5 text-lg sm:text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-2xl hover:shadow-purple-500/25 rounded-2xl"
          data-testid="button-format"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
              <span>AI is working...</span>
            </>
          ) : (
            <>
              <Wand2 className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              <span>✨ Format with AI</span>
            </>
          )}
        </Button>
        <Button
          onClick={loadExample}
          variant="outline"
          className="sm:w-auto py-4 sm:py-5 px-6 sm:px-8 text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-200 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500"
          data-testid="button-example"
        >
          <Lightbulb className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Load Example
        </Button>
      </div>

      {/* Results Section */}
      {formattedResult && (
        <div className="space-y-4 bounce-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI-Optimized Result</h3>
                <p className="text-sm text-muted-foreground">Professional, structured prompt ready to use</p>
              </div>
            </div>
            <Button
              onClick={copyToClipboard}
              variant={copied ? "default" : "outline"}
              className={`px-6 py-2 font-medium transition-all duration-200 rounded-lg ${copied ? 'bg-green-600 hover:bg-green-700' : 'hover:scale-105'}`}
              data-testid="button-copy"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Result
                </>
              )}
            </Button>
          </div>
          <div className="bg-gradient-to-br from-muted/50 to-muted border-2 border-primary/20 rounded-xl p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 gradient-bg"></div>
            <div className="font-mono text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap selection:bg-primary/20">
              {formattedResult}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>This formatted prompt will give you much better AI responses!</span>
          </div>
        </div>
      )}
    </div>
  );
}
