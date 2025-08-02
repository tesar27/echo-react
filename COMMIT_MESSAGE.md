feat: Complete Twitter/X-like social media functionality (MVP)

✨ Core Features:
- Simplified auth: username/password only (no email verification)
- Post creation with 280-char limit and real-time counter
- Like/unlike system with optimistic updates
- Follow/unfollow users with suggested users sidebar
- Delete posts (owner only) with confirmation dialog
- Logout functionality with dropdown menu

🏗️ Technical Implementation:
- Full TypeScript type system for Echo and User entities
- Custom hooks (useEchoes, useUsers) for state management
- RESTful API service layer (EchoService, UserService)
- Real-time UI updates with error handling and recovery
- Responsive design with Tailwind CSS

🎨 UI/UX Features:
- Twitter-like MainFeed with compose interface
- Interactive RightSidebar with who-to-follow suggestions
- Sidebar with user menu and logout dropdown
- Loading states, error messages, and confirmation dialogs
- Mobile-responsive design with hover effects

🚀 Ready for Production:
- Build optimization with Vite
- Comprehensive error handling
- Accessibility features
- Performance optimizations
- Complete documentation
- Streamlined MVP authentication flow

All major social media interactions functional. Ready for backend integration.
