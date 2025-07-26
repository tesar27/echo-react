# Echo - Social Media Frontend

A modern React TypeScript frontend for Echo, a Twitter-like social media application. Built with senior-level React development practices, featuring authentication, responsive design, and modern UI components.

## 🚀 Features

- **Authentication System**: Complete user registration, login, and email verification
- **Modern UI**: Twitter-like interface built with Tailwind CSS
- **Responsive Design**: Optimized for desktop and mobile devices
- **Type Safety**: Full TypeScript implementation with proper typing
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Protected Routes**: Secure routing with JWT token management
- **Error Handling**: Comprehensive error handling and user feedback
- **Reusable Components**: Well-structured component architecture

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router DOM for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API for global state

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components (Button, Input, Card)
│   ├── auth/           # Authentication components
│   └── layout/         # Layout components
├── pages/              # Page-level components
├── context/            # React Context providers
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API server running on `http://localhost:3000`

### Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd echo_react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend Setup

Ensure your backend API is running on `http://localhost:3000` with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email?token=TOKEN` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email

## 📖 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. **Registration**: Users sign up with username, email, password, and display name
2. **Email Verification**: Users receive an email with verification link
3. **Login**: Verified users can log in to access the dashboard
4. **JWT Management**: Tokens are stored in localStorage and automatically included in API requests

## 🎨 UI Components

The application includes a comprehensive set of reusable UI components:

- **Button**: Multiple variants (primary, secondary, ghost, danger)
- **Input**: Form inputs with labels, errors, and helper text
- **Card**: Container components for content organization
- **Alert**: Notification components for success/error messages
- **Layout**: Consistent page layouts with headers and navigation

## 🔧 Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper TypeScript typing
- Follow component composition patterns
- Use semantic HTML elements
- Implement accessibility best practices

### Error Handling
- All API calls include proper error handling
- User-friendly error messages
- Loading states for async operations
- Form validation with clear feedback

### Performance
- Lazy loading for route components
- Optimized bundle splitting
- Efficient re-rendering patterns
- Proper dependency management in hooks

## 🌟 Key Features Implemented

### Authentication Pages
- **Login Form**: Username/password authentication
- **Registration Form**: Complete user signup flow
- **Email Verification**: Token-based email confirmation
- **Resend Verification**: Resend verification emails

### Dashboard
- **User Profile**: Display user information and verification status
- **Post Creation**: Interface for creating new posts (Echo)
- **Activity Stats**: User engagement metrics
- **Responsive Layout**: Mobile-friendly design

### Navigation
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Route Guards**: Proper access control
- **Navigation State**: Persistent login state

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Follow the established code style
2. Add TypeScript types for new features
3. Include proper error handling
4. Write reusable components
5. Test on multiple devices/browsers

## 📄 License

This project is part of the Echo social media application.

---

**Happy coding! 🎉**
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
