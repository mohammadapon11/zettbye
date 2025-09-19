'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnimatedChart } from '@/components/dashboard/AnimatedChart';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/lib/constants';
import { Post, User } from '@/types';
import { useState } from 'react';
import { ErrorState } from '@/components/ui/ErrorBoundary';

/**
 * Dashboard home page with animated stats and welcome section
 */
export default function DashboardPage() {
  const [simulateError, setSimulateError] = useState(false);
  
  const { data: posts, loading: postsLoading, error: postsError, retry: retryPosts } = useFetch<Post[]>(
    simulateError ? API_ENDPOINTS.INVALID : API_ENDPOINTS.POSTS
  );
  
  const { data: users, loading: usersLoading, error: usersError, retry: retryUsers } = useFetch<User[]>(
    API_ENDPOINTS.USERS
  );

  const handleSimulateError = () => {
    setSimulateError(true);
  };

  const handleRetry = () => {
    setSimulateError(false);
    retryPosts();
    retryUsers();
  };

  if (postsError || usersError) {
    return (
      <ErrorState
        error={postsError || usersError || 'Failed to load dashboard data'}
        onRetry={handleRetry}
        title="Dashboard Load Error"
      />
    );
  }

  const statsData = [
    {
      title: 'Total Posts',
      value: posts?.length || 0,
      change: 12,
      icon: FileText,
      color: 'blue' as const,
    },
    {
      title: 'Total Users',
      value: users?.length || 0,
      change: 8,
      icon: Users,
      color: 'green' as const,
    },
    {
      title: 'Active Users',
      value: Math.floor((users?.length || 0) * 0.7),
      change: -2,
      icon: Activity,
      color: 'purple' as const,
    },
    {
      title: 'Growth Rate',
      value: '23%',
      change: 15,
      icon: TrendingUp,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        whileHover={{
          rotateX: 2,
          y: -5,
          transition: { duration: 0.3 }
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200 relative overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <motion.h1
                  className="text-3xl font-bold text-gray-900 mb-2 p-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to Zettabyte Dashboard
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Monitor your application performance and user engagement in real-time.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleSimulateError}
                    variant="outline"
                    icon={<AlertCircle className="h-4 w-4" />}
                    className="mr-3"
                  >
                    Simulate Error
                  </Button>
                  <Button variant="primary">
                    View Analytics
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className="hidden lg:block relative"
                initial={{ scale: 0, rotate: -180, rotateY: -90 }}
                animate={{ scale: 1, rotate: 0, rotateY: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 1,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 180,
                  transition: { duration: 0.5 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-16 w-16 text-primary-600" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                </div>
                
                {/* Floating elements */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-primary-300 rounded-full"
                    animate={{
                      x: [0, Math.cos(i * Math.PI / 2) * 60],
                      y: [0, Math.sin(i * Math.PI / 2) * 60],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
      >
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            index={index}
          />
        ))}
      </motion.div>

      {/* Charts and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedChart />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500">Latest updates from your dashboard</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                  { action: 'Post published', time: '5 minutes ago', type: 'post' },
                  { action: 'System update completed', time: '1 hour ago', type: 'system' },
                  { action: 'Backup created', time: '3 hours ago', type: 'system' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-green-500' :
                      activity.type === 'post' ? 'bg-blue-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Loading States */}
      {(postsLoading || usersLoading) && (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-sm text-gray-500">Loading dashboard data...</div>
        </motion.div>
      )}
    </div>
  );
}
