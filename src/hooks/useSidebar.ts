'use client';

import { useLocalStorage } from './useLocalStorage';
import { useEffect, useState } from 'react';

/**
 * Hook for managing sidebar state with persistence and mobile responsiveness
 */
export function useSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebar-collapsed', false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Initialize mobile state
  useEffect(() => {
    const checkInitialMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    checkInitialMobile();
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // Close mobile sidebar when switching to desktop
      if (!mobile) {
        setIsMobileOpen(false);
      }
      
      // Auto-collapse on mobile initially
      if (mobile && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    // Initial check
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isCollapsed, setIsCollapsed]);

  const toggle = () => {
    if (isMobile) {
      setIsMobileOpen(prev => {
        return !prev;
      });
    } else {
      setIsCollapsed(prev => {
        return !prev;
      });
    }
  };
  
  const collapse = () => {
    setIsCollapsed(true);
    setIsMobileOpen(false);
  };
  
  const expand = () => {
    if (isMobile) {
      setIsMobileOpen(true);
    } else {
      setIsCollapsed(false);
    }
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return {
    isCollapsed,
    isMobile,
    isMobileOpen,
    toggle,
    collapse,
    expand,
    closeMobile,
  };
}
