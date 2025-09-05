import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is a prompt formatter?",
    answer: "A prompt formatter is a tool that transforms messy, unclear prompts into well-structured, effective instructions for AI models like ChatGPT and Gemini. It helps improve prompt clarity, adds proper context, and ensures you get better responses from AI assistants."
  },
  {
    question: "How does this prompt expander work?",
    answer: "Our prompt expander analyzes your input and adds context, structure, and clarity to create optimized prompts. It uses advanced AI to identify missing elements, add proper formatting, and suggest improvements that lead to significantly better AI responses."
  },
  {
    question: "Is this prompt optimizer free?",
    answer: "Yes! Our prompt optimizer is completely free with no usage limits, sign-up requirements, or paywalls. We believe everyone should have access to professional prompt formatting tools to improve their AI interactions."
  },
  {
    question: "Which AI models work with formatted prompts?",
    answer: "Our formatted prompts work with all major AI models including ChatGPT (GPT-3.5, GPT-4), Google Gemini, Claude, and other language models. The structured format we create follows best practices that are universally effective across platforms."
  },
  {
    question: "Can I use this for commercial purposes?",
    answer: "Absolutely! There are no restrictions on using our prompt formatter for commercial purposes. Many businesses, freelancers, and agencies use our tool to create better prompts for client work, content creation, and internal processes."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Prompt Formatter FAQ
          </h2>
          <p className="text-muted-foreground">
            Common questions about our free prompt formatting and optimization tool
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openItems.includes(index);
            
            return (
              <div key={index} className="bg-card border border-border rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left px-6 py-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                  data-testid={`faq-button-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{item.question}</h3>
                    {isOpen ? (
                      <ChevronUp className="text-muted-foreground h-5 w-5" />
                    ) : (
                      <ChevronDown className="text-muted-foreground h-5 w-5" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    <p className="text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
