import { CheckCircle, XCircle, Briefcase, Code, GraduationCap, PenTool, TrendingUp, Users, Rocket, Shield, Smartphone, Infinity, Wand2, Menu, X, ArrowRight, Sparkles, Lightbulb, ChevronUp, ChevronDown, Heart } from "lucide-react";
import { useState } from "react";
import PromptFormatter from "@/components/PromptFormatter";
import FAQ from "@/components/FAQ";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProTips, setShowProTips] = useState(true);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const scrollToFormatter = () => {
    document.getElementById('format')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const templates = [
    { icon: Briefcase, title: "Business Writing", description: "Professional emails, proposals, and reports" },
    { icon: Code, title: "Code Generation", description: "Programming tasks and technical documentation" },
    { icon: GraduationCap, title: "Learning & Education", description: "Study guides, explanations, and tutorials" },
    { icon: PenTool, title: "Creative Writing", description: "Stories, blog posts, and marketing copy" },
    { icon: TrendingUp, title: "Data Analysis", description: "Research, analytics, and insights generation" },
    { icon: Users, title: "Personal Assistant", description: "Planning, organization, and productivity" }
  ];

  const features = [
    { icon: Rocket, title: "Instant Results", description: "Get optimized prompts in seconds, not hours of trial and error", color: "text-chart-1" },
    { icon: Shield, title: "Privacy First", description: "Your prompts are processed securely and never stored or shared", color: "text-chart-2" },
    { icon: Smartphone, title: "Mobile Optimized", description: "Works perfectly on any device - desktop, tablet, or mobile", color: "text-chart-3" },
    { icon: Infinity, title: "No Limits", description: "Format unlimited prompts with no usage caps or restrictions", color: "text-chart-4" }
  ];

  const proTips = [
    {
      icon: "🎯",
      title: "Be Specific About Format",
      description: "Specify bullet points, JSON, paragraphs, or tables",
      example: "Instead of 'list items', say 'create a bulleted list with 5 items'"
    },
    {
      icon: "🔍",
      title: "Add Context & Constraints",
      description: "Include relevant background and limitations",
      example: "Add 'for a tech startup targeting millennials' to your marketing prompt"
    },
    {
      icon: "👤",
      title: "Assign a Role",
      description: "Give the AI a specific persona or expertise",
      example: "Start with 'Act as a senior marketer with 10 years experience...'"
    },
    {
      icon: "📋",
      title: "Break Into Steps",
      description: "Number complex tasks for clearer execution",
      example: "Use 'Step 1: Research, Step 2: Analyze, Step 3: Create' format"
    }
  ];

  return (
    <>
      <SEOHead />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-6xl">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 rounded-lg gradient-bg">
                <Wand2 className="text-white h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="text-base sm:text-xl font-bold gradient-text">Prompt Formatter</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <button onClick={() => scrollToSection('format')} className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 font-medium">
                Formatter
              </button>
              <button onClick={() => scrollToSection('optimize')} className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 font-medium">
                Features
              </button>
              <a
                href="https://sokaina4.gumroad.com/coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-pink-500/30"
              >
                <Heart className="h-4 w-4 fill-current" />
                <span>Support</span>
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </nav>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay md:hidden">
            <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
              <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
                <div className="space-y-2 sm:space-y-4">
                  <button onClick={() => scrollToSection('format')} className="w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-accent transition-colors font-medium">
                    🎯 Formatter Tool
                  </button>
                  <button onClick={() => scrollToSection('optimize')} className="w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-accent transition-colors font-medium">
                    ⚡ Features
                  </button>
                  <a
                    href="https://sokaina4.gumroad.com/coffee"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-pink-500/30"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Support Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="format" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
          {/* Enhanced Background Elements with More Bubbles */}
          <div className="absolute inset-0 opacity-10">
            {/* Top row bubbles */}
            <div className="absolute top-16 left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full gradient-bg floating-animation"></div>
            <div className="absolute top-24 right-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full gradient-bg floating-animation" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-32 left-1/4 w-10 h-10 sm:w-14 sm:h-14 rounded-full gradient-bg floating-animation" style={{animationDelay: '2s'}}></div>
            
            {/* Middle row bubbles */}
            <div className="absolute top-1/3 left-8 w-14 h-14 sm:w-18 sm:h-18 rounded-full gradient-bg floating-animation" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 right-12 w-10 h-10 sm:w-16 sm:h-16 rounded-full gradient-bg floating-animation" style={{animationDelay: '4s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-12 h-12 sm:w-20 sm:h-20 rounded-full gradient-bg floating-animation" style={{animationDelay: '5s'}}></div>
            
            {/* Bottom row bubbles */}
            <div className="absolute bottom-32 left-12 w-8 h-8 sm:w-14 sm:h-14 rounded-full gradient-bg floating-animation" style={{animationDelay: '6s'}}></div>
            <div className="absolute bottom-24 right-1/4 w-16 h-16 sm:w-22 sm:h-22 rounded-full gradient-bg floating-animation" style={{animationDelay: '7s'}}></div>
            <div className="absolute bottom-16 left-2/3 w-6 h-6 sm:w-10 sm:h-10 rounded-full gradient-bg floating-animation" style={{animationDelay: '8s'}}></div>
            
            {/* Additional scattered bubbles */}
            <div className="absolute top-1/4 right-1/3 w-8 h-8 sm:w-12 sm:h-12 rounded-full gradient-bg floating-animation" style={{animationDelay: '9s'}}></div>
            <div className="absolute top-3/4 left-1/5 w-10 h-10 sm:w-16 sm:h-16 rounded-full gradient-bg floating-animation" style={{animationDelay: '10s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full gradient-bg floating-animation" style={{animationDelay: '11s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
            {/* Hero Content - Mobile Optimized */}
            <div className="text-center mb-6 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-foreground mb-3 sm:mb-4 border border-purple-200 dark:border-purple-700">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                Free AI-Powered Tool
              </div>
              
              <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-6 leading-tight max-w-4xl mx-auto">
                Transform Your <span className="gradient-text animate-gradient">Prompts</span> Into
                <br className="hidden sm:block" /> 
                <span className="gradient-text animate-gradient">Professional</span> Instructions
              </h1>
              
              <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                Turn messy, unclear prompts into structured, effective instructions that get 
                <strong className="text-foreground"> 3x better results</strong> from ChatGPT, Gemini, and any AI model. 
                Our <strong className="text-foreground">prompt formatter</strong> works 
                <strong className="text-foreground"> instantly online</strong> with no sign-up required.
              </p>
              
              {/* Buttons - Hidden on Mobile */}
              <div className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <button 
                  onClick={scrollToFormatter}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-purple-500/25"
                  data-testid="cta-format-now"
                >
                  <Wand2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  Start Formatting Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button 
                  onClick={() => scrollToSection('optimize')}
                  className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 text-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-lg"
                >
                  See How It Works
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-6 justify-center text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="font-medium text-xs sm:text-sm">100% Free</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="font-medium text-xs sm:text-sm">No Sign-up</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="font-medium text-xs sm:text-sm">Instant Results</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="font-medium text-xs sm:text-sm">Works on Mobile</span>
                </div>
              </div>
            </div>

            {/* Enhanced Formatter Section */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Background decoration for formatter */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl blur-lg opacity-60"></div>
                
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl">
                  <PromptFormatter />
                </div>
              </div>
            </div>

            {/* Enhanced Pro Tips Section */}
            {showProTips && (
              <div className="mt-8 sm:mt-16 max-w-5xl mx-auto">
                <div className="relative">
                  {/* Background decoration */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-3xl blur-xl opacity-50"></div>
                  
                  <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                    {/* Header with close button */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                            🚀 Pro Tips for Better Prompts
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Master these techniques to get 3x better results
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowProTips(false)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
                        aria-label="Close Pro Tips"
                      >
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>

                    {/* Tips Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {proTips.map((tip, index) => (
                        <div
                          key={index}
                          className={`group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                            expandedTip === index ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                          }`}
                          onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                              {tip.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {tip.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {tip.description}
                              </p>
                              {expandedTip === index && (
                                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                  <p className="text-xs text-purple-700 dark:text-purple-300 font-medium mb-1">
                                    💡 Example:
                                  </p>
                                  <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                                    {tip.example}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="text-muted-foreground group-hover:text-purple-500 transition-colors">
                              {expandedTip === index ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-yellow-500" />
                          <span>Apply these tips to get professional results instantly</span>
                        </div>
                        <button
                          onClick={scrollToFormatter}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                          <Wand2 className="w-4 h-4" />
                          Try It Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Show Pro Tips Button (when hidden) */}
            {!showProTips && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={() => setShowProTips(true)}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/40 dark:hover:to-pink-800/40 text-foreground px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg border border-purple-200 dark:border-purple-700"
                >
                  <div className="p-1.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <span>Show Pro Tips</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Showcase */}
        <section id="optimize" className="py-16 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
                Why Choose Our Prompt Formatter?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Professional prompt engineering made simple and accessible
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${feature.color}/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <feature.icon className={`${feature.color} h-5 w-5 sm:h-6 sm:w-6`} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 gradient-bg">
          <div className="container mx-auto px-3 sm:px-4 max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-foreground mb-3 sm:mb-4">
              Ready to Transform Your Prompts?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8">
              Join thousands of users who create better AI prompts every day
            </p>
            <button 
              onClick={scrollToFormatter}
              className="bg-background text-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-background/90 transition-colors shadow-lg"
              data-testid="button-scroll-to-formatter"
            >
              Start Formatting Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer
      <footer className="bg-card border-t border-border py-12 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Wand2 className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg font-semibold text-foreground">Prompt Formatter</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                The ultimate free prompt formatter and expander for ChatGPT, Gemini, and all AI models. 
                Transform messy prompts into professional, structured instructions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><a href="#format" className="text-muted-foreground hover:text-primary transition-colors">Prompt Formatter Tool</a></li>
                <li><a href="#optimize" className="text-muted-foreground hover:text-primary transition-colors">AI Prompt Optimizer</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
              <div className="space-y-2 sm:space-y-3">
                <a 
                  href="https://ko-fi.com/promptfmt " 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-chart-2 text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-chart-2/90 transition-colors"
                >
                  <span>❤️</span>
                  <span className="text-xs sm:text-sm font-medium">Buy me a coffee</span>
                </a>
                <p className="text-xs text-muted-foreground">
                  Help keep this tool free for everyone
                </p>
              </div>
            </div>
          </div>
          
          <hr className="border-border my-6 sm:my-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 sm:space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-xs sm:text-sm">
              © 2025 Prompt Formatter – built with Gemini
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
              <a href="mailto:support@promptfmt.com" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
}