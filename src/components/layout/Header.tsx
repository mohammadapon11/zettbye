'use client';

import { motion } from 'framer-motion';
import { Bell, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SignInButton, ProfileButton } from '@/components/auth/SignInButton';
import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Application header with responsive design
 */
export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // Close mobile sidebar when switching to desktop
      if (!mobile) {
        setIsMobileSidebarOpen(false);
      }
    };

    // Initial check
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };


  return (
    <>
      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Mobile Overlay */}
          {isMobileSidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <motion.aside
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
            animate={{
              x: isMobileSidebarOpen ? 0 : -400,
            }}
            initial={{ x: -400 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          >
            {/* Mobile Sidebar Header */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">Z</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Zettabyte</h1>
                    <p className="text-xs text-gray-500 font-medium">Dashboard v2.0</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-md border border-primary-200/50"
                  >
                    <div className="w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🏠</span>
                    </div>
                    <span className="font-medium text-lg">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posts"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📄</span>
                    </div>
                    <span className="font-medium text-lg">Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">👥</span>
                    </div>
                    <span className="font-medium text-lg">Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">👤</span>
                    </div>
                    <span className="font-medium text-lg">Profile</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-gray-200/50 text-center text-xs text-gray-500 font-medium">
              © {new Date().getFullYear()} Zettabyte Technology
            </div>
          </motion.aside>
        </>
      )}

      {/* Header */}
      <motion.header
        className="fixed top-0 right-0 bg-white border-b border-gray-200 shadow-sm z-30"
        style={{
          left: isMobile ? 0 : 280,
        }}
        animate={{
          left: isMobile ? 0 : 280,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
      >
        <div className="flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => {
                console.log('Header: Mobile menu clicked', { 
                  isMobile, 
                  isMobileSidebarOpen,
                  windowWidth: window.innerWidth 
                });
                toggleMobileSidebar();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isMobileSidebarOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </motion.button>
          
          <motion.h1
            className="text-xl lg:text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Dashboard
          </motion.h1> 
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-48 lg:w-64"
            />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="sm" className="p-2 md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile Button */}
          <ProfileButton />

          {/* Authentication */}
          <SignInButton />
        </div>
      </div>
    </motion.header>
    </>
  );
}
