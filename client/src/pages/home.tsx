import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { formatPrompt } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Copy, Wand2, Zap, Target, GraduationCap, Check, ChevronDown, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function Home() {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Prompt Formatter
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium" data-testid="link-features">
                Features
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium" data-testid="link-faq">
                FAQ
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium" data-testid="link-about">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
            <div className="text-center mb-8 sm:mb-16">
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-8 animate-pulse">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-2" />
                <span className="text-xs sm:text-sm font-medium text-primary">AI-Powered Enhancement</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight" data-testid="text-hero-title">
                <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Professional Prompt
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Formatter for ChatGPT
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-12 leading-relaxed" data-testid="text-hero-description">
                Transform your raw prompts into polished, structured instructions that help AI models deliver 
                better responses. Our AI-powered formatter enhances clarity, removes ambiguity, and 
                optimizes your prompts for maximum effectiveness.
              </p>
            </div>

            {/* Main Tool Interface */}
            <div className="max-w-5xl mx-auto">
              <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-lg">
                <CardHeader className="text-center pb-6 sm:pb-8">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center justify-center gap-2 sm:gap-3" data-testid="text-tool-title">
                    <Wand2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    Format Your Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8">
                  {/* Input Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="prompt-input" className="block text-base sm:text-lg font-semibold text-foreground">
                      Enter your raw prompt
                    </label>
                    <div className="relative">
                      <Textarea 
                        id="prompt-input"
                        data-testid="input-prompt"
                        placeholder="Paste your prompt here... For example: 'write me a blog post about artificial intelligence'"
                        value={inputPrompt}
                        onChange={(e) => setInputPrompt(e.target.value)}
                        className="h-32 sm:h-40 resize-none text-sm sm:text-base leading-relaxed border-2 focus:border-primary/50 transition-all duration-200"
                        maxLength={1000}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded" data-testid="text-character-limit">
                        {inputPrompt.length}/1000
                      </div>
                    </div>
                  </div>

                  {/* Format Button */}
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleFormat}
                      disabled={formatMutation.isPending || !inputPrompt.trim()}
                      className="px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      data-testid="button-format"
                    >
                      {formatMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3" />
                          Formatting...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                          Format Prompt
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Loading State */}
                  {formatMutation.isPending && (
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 sm:p-6 border border-primary/20" data-testid="loading-state">
                      <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <p className="text-center text-foreground font-medium text-sm sm:text-base">Enhancing your prompt with AI...</p>
                    </div>
                  )}

                  {/* Output Section */}
                  {formattedPrompt && !formatMutation.isPending && (
                    <div data-testid="output-section" className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-base sm:text-lg font-semibold text-foreground">
                          ✨ Enhanced Prompt
                        </label>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Ready to use
                        </Badge>
                      </div>
                      <div className="relative">
                        <Textarea 
                          id="prompt-output"
                          data-testid="output-prompt"
                          value={formattedPrompt}
                          readOnly
                          className="h-40 sm:h-56 bg-gradient-to-br from-secondary/50 to-muted/50 resize-none text-sm sm:text-base leading-relaxed border-2 border-primary/20"
                        />
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleCopy}
                          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary hover:bg-primary/90 shadow-lg"
                          data-testid="button-copy"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground text-center bg-primary/5 rounded-lg p-2 sm:p-3" data-testid="text-copy-instruction">
                        💡 Click copy to use this enhanced prompt with ChatGPT or any AI model
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-20 bg-gradient-to-br from-secondary/20 to-background">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4" data-testid="text-features-title">
                Why Use Our Prompt Formatter?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Get better AI responses by transforming your casual prompts into professional, structured instructions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:scale-105">
                <CardContent className="p-4 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-foreground" data-testid="text-feature-instant-title">
                    Instant Enhancement
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base" data-testid="text-feature-instant-description">
                    Transform prompts in seconds with AI-powered formatting that adds structure, context, and clarity to your requests.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:scale-105">
                <CardContent className="p-4 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-foreground" data-testid="text-feature-results-title">
                    Better Results
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base" data-testid="text-feature-results-description">
                    Formatted prompts generate more accurate, detailed, and useful responses from ChatGPT and other AI models.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:scale-105">
                <CardContent className="p-4 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-foreground" data-testid="text-feature-learn-title">
                    Learn Best Practices
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base" data-testid="text-feature-learn-description">
                    See how professional prompt engineering works and improve your own prompt writing skills over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-lg border-t border-border/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 md:mb-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Wand2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-base sm:text-lg text-foreground" data-testid="text-footer-brand">
                Prompt Formatter
              </span>
            </div>
            <div className="flex space-x-4 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-privacy">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-terms">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-contact">Contact</a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground" data-testid="text-footer-copyright">
              © 2024 Prompt Formatter. Free AI prompt enhancement tool for better ChatGPT responses.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}