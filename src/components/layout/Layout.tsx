'use client';

import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { useSidebar } from '@/hooks/useSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component with responsive sidebar
 */
export function Layout({ children }: LayoutProps) {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingParticles />
      
      {/* Desktop Sidebar - Only show on desktop */}
      {!isMobile && <Sidebar />}
      
      {/* Header with Mobile Sidebar - Always show */}
      <Header />
      
      <motion.main
        className="pt-16 lg:pt-20"
        animate={{
          marginLeft: isMobile ? 0 : (isCollapsed ? 80 : 280),
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
      >
        <div className="p-4 lg:p-6 relative z-10">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
