# Prompt Formatter

## Overview

This is a full-stack web application that helps users format and enhance their prompts for ChatGPT and other AI models. The application takes raw, unstructured prompts and transforms them into clear, organized instructions that produce better AI responses. Built with React on the frontend and Express on the backend, it uses Google's Gemini AI to intelligently rewrite prompts with proper structure, context, and clarity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component system for consistent, accessible design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints with proper error handling and validation using Zod schemas
- **Security**: Helmet for security headers, CORS for cross-origin requests
- **Development**: Hot reload with tsx for TypeScript execution

### AI Integration
- **Provider**: Google Gemini AI (gemini-2.5-flash model) for prompt formatting
- **Processing**: Structured system prompts that guide the AI to enhance clarity, add context, and format prompts effectively
- **Error Handling**: Graceful fallbacks and user-friendly error messages for API failures

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured via DATABASE_URL environment variable
- **Connection**: Neon serverless PostgreSQL for scalable cloud database
- **Migrations**: Drizzle Kit for database schema management
- **Schema**: User management system with username/password authentication ready

### Development Tools
- **Bundling**: ESBuild for fast server-side bundling in production
- **Type Checking**: TypeScript compiler with strict mode enabled
- **Code Quality**: Path aliases for clean imports, consistent file structure
- **Environment**: Support for development and production configurations

### API Endpoints
- `POST /api/format` - Main endpoint for prompt formatting with input validation (1000 character limit)
- Request/response types defined with proper TypeScript interfaces
- Error handling with appropriate HTTP status codes and user-friendly messages

### Security Considerations
- Input validation and sanitization for all user inputs
- Rate limiting through request size constraints
- Secure headers via Helmet middleware
- Environment variable protection for API keys

### Deployment Architecture
- **Production Build**: Static frontend assets served from Express server
- **Asset Management**: Vite handles asset optimization and bundling
- **Environment**: Production/development environment detection
- **Logging**: Request/response logging for API endpoints with performance metrics