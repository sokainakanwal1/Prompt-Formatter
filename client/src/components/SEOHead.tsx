import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({ 
  title = "Prompt Formatter & Expander - Free ChatGPT Prompt Optimizer",
  description = "Free prompt formatter and expander. Paste any messy prompt, get a structured ChatGPT or Gemini-ready version instantly. No sign-up.",
  canonical = "/",
  ogImage = "/api/og"
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${window.location.origin}${canonical}`);

    // Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${window.location.origin}${ogImage}` },
      { property: 'og:url', content: `${window.location.origin}${canonical}` },
      { property: 'og:type', content: 'website' },
    ];

    ogTags.forEach(({ property, content }) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${window.location.origin}${ogImage}` },
    ];

    twitterTags.forEach(({ name, content }) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', content);
    });

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a prompt formatter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A prompt formatter is a tool that transforms messy, unclear prompts into well-structured, effective instructions for AI models like ChatGPT and Gemini. It helps improve prompt clarity and response quality."
          }
        },
        {
          "@type": "Question",
          "name": "How does this prompt expander work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our prompt expander analyzes your input and adds context, structure, and clarity to create optimized prompts. It uses AI to identify missing elements and suggests improvements for better results."
          }
        },
        {
          "@type": "Question",
          "name": "Is this prompt optimizer free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our prompt optimizer is completely free with no usage limits, sign-up requirements, or paywalls. We believe everyone should have access to better prompt formatting tools."
          }
        }
      ]
    };

    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, canonical, ogImage]);

  return null;
}
