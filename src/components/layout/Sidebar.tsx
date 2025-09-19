'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  X
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSidebar } from '@/hooks/useSidebar';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { useAuth } from '@/lib/mockAuth';

const iconMap = {
  LayoutDashboard,
  FileText,
  Users,
  User,
};

/**
 * Modern animated sidebar with advanced 3D effects and smooth transitions
 */
export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobile, isMobileOpen, toggle, closeMobile } = useSidebar();
  const { isAuthenticated } = useAuth();

  // Animation variants for content visibility
  const contentVariants = {
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  // Animation variants for navigation items
  const itemVariants = {
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        type: 'spring',
        stiffness: 300,
      },
    }),
    hidden: {
      opacity: 0,
      x: -30,
      rotateY: -15,
      transition: {
        duration: 0.2,
      },
    },
  };


  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobile}
            style={{ zIndex: 40 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white shadow-2xl z-50",
          "flex flex-col overflow-hidden",
          isMobile ? "w-full max-w-sm" : "",
          isMobile && !isMobileOpen ? "pointer-events-none" : ""
        )}
        animate={
          isMobile
            ? {
              x: isMobileOpen ? 0 : -400
            }
            : {
              width: isCollapsed ? 80 : 280,
              x: 0
            }
        }
        initial={
          isMobile
            ? { x: -400 }
            : { width: 280, x: 0 }
        }
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        style={{
          transformStyle: 'preserve-3d',
          zIndex: 50,
        }}
        whileHover={{
          boxShadow: isMobile
            ? undefined
            : "0 32px 64px -12px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-blue-50/30 -z-10" />

        {/* Mobile Debug Indicator */}
        {isMobile && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-50">
            {isMobileOpen ? 'OPEN' : 'CLOSED'}
          </div>
        )}

        {/* Header Section */}
        <motion.header
          className={cn(
            "relative border-b border-gray-200/50",
            isMobile ? "p-4" : "p-[15px]"
          )}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <motion.div
              className={`space-x-3 ${isCollapsed ? 'hidden' : 'flex items-center'}`}
              variants={contentVariants}
              animate={(!isMobile && isCollapsed) ? 'hidden' : 'visible'}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="relative"
                whileHover={{
                  scale: 1.1,
                  rotateY: 180,
                  transition: { duration: 0.6 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary-400 rounded-xl blur-lg opacity-30 -z-10" />
              </motion.div>

              {(!isMobile && !isCollapsed) || isMobile ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Zettabyte
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Dashboard v2.0</p>
                </motion.div>
              ) : null}
            </motion.div>

            {/* Mobile Close Button - Always visible on mobile */}
            {isMobile ? (
              <motion.button
                onClick={() => {
                  closeMobile();
                }}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Close menu"
              >
                <X className="h-5 w-5 text-gray-600" />
              </motion.button>
            ) : (
              /* Desktop Toggle Button */
              <motion.button
                onClick={() => {
                  toggle();
                }}
                className={`p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 active:scale-95 border border-gray-200/50 shadow-sm ${isCollapsed ? 'mx-auto' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                )}
              </motion.button>
            )}
          </div>

          {/* Collapsed Logo Only - Desktop only */}
          {!isMobile && isCollapsed && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ scale: 0, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* Navigation Section */}
        <nav className={cn(
          "flex-1 overflow-y-auto",
          isMobile ? "p-4" : "p-4"
        )}>
          <motion.ul
            className={cn(
              "space-y-2",
              isMobile ? "space-y-3" : "space-y-2"
            )}
            initial="hidden"
            animate="visible"
          >
            {NAVIGATION_ITEMS.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = pathname === item.href;

              // Hide protected routes if user is not authenticated
              if (item.protected && !isAuthenticated) {
                return null;
              }

              return (
                <motion.li
                  key={item.href}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={isMobile ? closeMobile : undefined}
                    className={cn(
                      "group relative flex items-center rounded-xl transition-all duration-200",
                      "hover:shadow-lg hover:shadow-primary-500/10",
                      !isMobile && isCollapsed
                        ? "justify-center p-3"
                        : isMobile
                          ? "space-x-4 p-4 text-lg"
                          : "space-x-3 p-3",
                      isActive
                        ? "bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-md border border-primary-200/50"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >

                    {/* Icon */}
                    <motion.div
                      className="relative"
                      whileHover={{
                        rotateY: 15,
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Icon className={cn(
                        "flex-shrink-0",
                        isMobile ? "h-6 w-6" : "h-5 w-5"
                      )} />
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary-400 rounded-lg blur-sm opacity-20 -z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      )}
                    </motion.div>

                    {/* Label */}
                    {((!isMobile && !isCollapsed) || isMobile) && (
                      <motion.span
                        className="font-medium"
                        variants={contentVariants}
                        animate="visible"
                        initial="hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {!isMobile && isCollapsed && (
                      <motion.div
                        className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        {item.label}
                        {/* Tooltip arrow */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900" />
                      </motion.div>
                    )}

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      whileHover={{ scale: 1.02 }}
                    />
                  </Link>
                </motion.li>
              );
            }).filter(Boolean)}
          </motion.ul>
        </nav>

        {/* Footer Section */}
        {((!isMobile && !isCollapsed) || isMobile) && (
          <motion.footer
            className="p-4 border-t border-gray-200/50 bg-gray-50/50"
            variants={contentVariants}
            animate="visible"
            initial="hidden"
          >
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-gray-500 font-medium">
                © 2024 Zettabyte Technology
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Built with ❤️ & Next.js 15
              </p>
            </motion.div>
          </motion.footer>
        )}

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100],
                y: [0, Math.random() * 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.aside>
    </>
  );
}
