export const API_ENDPOINTS = {
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
  USERS: 'https://jsonplaceholder.typicode.com/users',
  INVALID: 'https://jsonplaceholder.typicode.com/invalid-posts', // For error testing
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.4 }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard', protected: false },
  { href: '/posts', label: 'Posts', icon: 'FileText', protected: false },
  { href: '/users', label: 'Users', icon: 'Users', protected: false },
  { href: '/profile', label: 'Profile', icon: 'User', protected: true },
] as const;

export const DASHBOARD_STATS = {
  POSTS: { label: 'Total Posts', icon: 'FileText', color: 'blue' },
  USERS: { label: 'Total Users', icon: 'Users', color: 'green' },
  ACTIVE: { label: 'Active Users', icon: 'Activity', color: 'purple' },
  GROWTH: { label: 'Growth Rate', icon: 'TrendingUp', color: 'orange' },
} as const;
