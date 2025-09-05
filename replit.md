# Project Overview

## Overview

This is a full-stack web application for prompt formatting and optimization, built as an SEO-optimized single-page application. The app allows users to input messy or unclear prompts and transforms them into well-structured, effective instructions for AI models like ChatGPT and Google Gemini. The application is designed to rank highly for prompt-related keywords and provides a completely free service with no usage limits.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation
- **SEO Optimization**: Custom SEO component for meta tags, Open Graph, and structured data

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with structured JSON responses
- **Development Server**: Custom Vite integration for hot module replacement
- **Error Handling**: Centralized error middleware with structured error responses

### AI Integration
- **AI Provider**: Google Gemini 1.5 Flash via @google/genai SDK
- **Use Case**: Prompt formatting and optimization with configurable system instructions
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Configuration**: Environment variable-based API key management

### Data Architecture
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schemas between client and server using Zod
- **Migrations**: Drizzle Kit for database schema management
- **Fallback**: In-memory storage implementation for development

### SEO and Performance
- **SEO Strategy**: Comprehensive on-page optimization targeting low-competition keywords
- **Meta Management**: Dynamic SEO head component with Open Graph and Twitter Cards
- **Image Generation**: Dynamic SVG-based Open Graph images
- **Schema Markup**: JSON-LD structured data for FAQPage schema
- **Performance**: Optimized for 100 Lighthouse score with preloaded assets

### Monetization
- **AdSense Integration**: Responsive ad slots with environment variable configuration
- **Ad Placement**: Strategic placement for desktop and mobile optimization
- **Privacy**: No user tracking or data collection beyond ad serving

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Hot module replacement and error overlay
- **Path Aliases**: Organized import structure with @ and @shared aliases

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **UI Framework**: Radix UI primitives, shadcn/ui components, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx utilities
- **AI Service**: Google Generative AI SDK for prompt processing
- **Database**: Neon Database serverless PostgreSQL, Drizzle ORM
- **Backend**: Express.js, TypeScript execution via tsx
- **Validation**: Zod for runtime type validation
- **Date Handling**: date-fns for date manipulation
- **Routing**: Wouter for client-side routing

### Development Dependencies
- **Build Tools**: Vite, esbuild for server bundling
- **TypeScript**: Full TypeScript support with strict configuration
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Cartographer and runtime error modal plugins

### Third-Party Services
- **AI Processing**: Google Gemini API for prompt optimization
- **Database Hosting**: Neon serverless PostgreSQL
- **Ad Network**: Google AdSense for monetization
- **Font Service**: Google Fonts (Inter font family)
- **CDN**: FontAwesome for additional icons

### Environment Configuration
- **Database**: DATABASE_URL for Neon connection string
- **AI Service**: GOOGLE_GEMINI_KEY or GEMINI_API_KEY for Google AI
- **AdSense**: VITE_ADSENSE_CLIENT and slot configuration variables
- **Development**: NODE_ENV for environment-specific behavior