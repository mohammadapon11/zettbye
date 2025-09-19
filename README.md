# Zettabyte Dashboard

A modern, responsive dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. This project demonstrates advanced React patterns, smooth animations, and production-ready code architecture.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Advanced 3D Animations**: Framer Motion with 3D transforms, staggered animations, modal transitions, and immersive effects
- **Authentication System**: Complete login/logout functionality with protected routes
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Custom Hooks**: Reusable hooks for data fetching, local storage, and debouncing
- **Error Handling**: Comprehensive error states with retry functionality
- **Performance Optimized**: Code splitting, lazy loading, and optimized animations
- **Clean Architecture**: Professional file structure with separation of concerns

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── posts/             # Posts listing and detail pages
│   ├── users/             # Users page with modal
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Card, Button, Modal)
│   ├── layout/           # Layout components (Sidebar, Header)
│   ├── dashboard/        # Dashboard-specific components
│   ├── posts/            # Post-related components
│   └── users/            # User-related components
├── hooks/                # Custom React hooks
├── lib/                  # Constants and configurations
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎨 Key Components

### Animated Sidebar
- Collapsible sidebar with smooth spring animations
- Persistent state using localStorage
- Responsive design with mobile support

### Staggered Card Animations
- Posts and users load with staggered entrance animations
- Hover effects and micro-interactions
- Loading states with skeleton animations

### Advanced Modal System
- Backdrop blur effects
- Scale and opacity transitions
- Keyboard navigation (ESC key)
- Focus management

### Error Handling
- Intentional error simulation for testing
- Retry functionality with exponential backoff
- User-friendly error messages

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd zettabyte-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

- **Dashboard (/)**: Animated stats cards, activity chart, and welcome section
- **Posts (/posts)**: Searchable posts grid with staggered animations
- **Post Detail (/posts/[id])**: Individual post view with navigation
- **Users (/users)**: Responsive table with animated modal details
- **Sign In (/auth/signin)**: Beautiful authentication page with demo login
- **Profile (/profile)**: Protected user profile page with account details

## 🎭 Animations

### Sidebar Animation
- Spring-based width transitions
- Content fade in/out based on collapsed state
- Smooth toggle button rotation

### Card Staggering
- Sequential entrance animations with delays
- Hover lift effects
- Loading skeleton states

### Modal Transitions
- Scale and opacity entrance/exit
- Backdrop blur animation
- Content staggered reveal

## 🔧 Custom Hooks

- **useFetch**: Advanced data fetching with loading states and retry
- **useLocalStorage**: SSR-safe localStorage management
- **useDebounce**: Performance optimization for search inputs
- **useSidebar**: Sidebar state management with persistence
- **useAuth**: Authentication state management with persistence

## 🔐 Authentication

The dashboard includes a complete authentication system:

### Demo Login Credentials:
- **Email**: `demo@zettabyte.com`
- **Password**: `demo123`

### Features:
- **Persistent Login**: State maintained across browser sessions
- **Protected Routes**: Profile page requires authentication
- **Dynamic Navigation**: Menu items appear/disappear based on auth state
- **Smooth Transitions**: Animated login/logout flow

## 🎯 Performance Optimizations

- Component lazy loading
- Image optimization
- Bundle splitting
- Debounced search inputs
- Memoized expensive calculations
- Optimized re-renders

## 🧪 Error Testing

The dashboard includes intentional error simulation:
- Click "Test Error" buttons to simulate API failures
- Comprehensive error boundaries
- Retry mechanisms with user feedback

## 🚀 Deployment

The project is optimized for deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

## 📊 Technical Decisions

### Why Framer Motion?
- Declarative animation API
- Spring physics for natural motion
- Gesture support and advanced transitions

### Why Custom Hooks?
- Separation of concerns
- Reusable business logic
- Easier testing and maintenance

### Why TypeScript?
- Type safety and better DX
- Improved refactoring capabilities
- Self-documenting code

## 🎨 Design Philosophy

- **Mobile-first**: Responsive design from the ground up
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized animations and lazy loading
- **User Experience**: Smooth transitions and clear feedback

## 🔍 Code Quality

- ESLint configuration for code consistency
- TypeScript for type safety
- Clean component architecture
- Comprehensive error handling

## 📈 Future Enhancements

- Dark mode support
- Real-time data updates
- Advanced filtering and sorting
- User authentication (Auth.js)
- Progressive Web App features

---

Built with ❤️ for Zettabyte Technology Inc.
