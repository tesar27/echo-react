<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Echo React Frontend - Copilot Instructions

## Project Overview

This is a React TypeScript frontend for a Twitter-like social media application called "Echo". The project uses modern React development practices with Vite as the build tool.

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **HTTP Client**: Fetch API with custom service layer
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components (Button, Input, Card, etc.)
│   ├── auth/           # Authentication-related components
│   └── layout/         # Layout components (Header, Layout, ProtectedRoute)
├── pages/              # Page-level components
├── context/            # React Context providers
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Code Style Guidelines

- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Use proper type imports (`import type { ... }`)
- Follow component composition patterns
- Implement proper error handling
- Use semantic HTML elements
- Follow accessibility best practices

## API Integration

- Backend API runs on `http://localhost:3000`
- Authentication endpoints are prefixed with `/api/auth/`
- JWT tokens are stored in localStorage
- All API calls should include proper error handling

## Key Features

- User registration and login
- Email verification flow
- JWT token management
- Protected routes
- Responsive design
- Form validation
- Error handling and user feedback

## Development Notes

- Components should be reusable and composable
- Use proper TypeScript typing throughout
- Implement loading states for async operations
- Include proper error boundaries where needed
- Follow React best practices for performance
- Use custom hooks for shared logic
