'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/lib/mockAuth';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Activity, 
  Settings,
  Crown,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { formatDate } from '@/utils/cn';

/**
 * Protected profile page showing user details
 */
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  const joinDate = new Date();

  const stats = [
    { label: 'Posts Viewed', value: '47', icon: Activity, color: 'blue' },
    { label: 'Profile Views', value: '12', icon: User, color: 'green' },
    { label: 'Account Status', value: 'Premium', icon: Crown, color: 'purple' },
    { label: 'Trust Score', value: '98%', icon: Shield, color: 'orange' },
  ];

  const activities = [
    { action: 'Viewed dashboard', time: '2 minutes ago', type: 'view' },
    { action: 'Updated profile', time: '1 hour ago', type: 'edit' },
    { action: 'Signed in', time: '3 hours ago', type: 'auth' },
    { action: 'Viewed posts', time: '5 hours ago', type: 'view' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
          <Button
            variant="outline"
            icon={<Settings className="h-4 w-4" />}
          >
            Settings
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 100 }}
          whileHover={{
            rotateY: 5,
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          <Card>
            <CardContent className="p-8 text-center">
              <motion.div
                className="relative inline-block mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-primary-600" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </motion.div>
              
              <motion.h2
                className="text-xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {user.name}
              </motion.h2>
              
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(joinDate)}</span>
                </div>
              </motion.div>
              
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button variant="primary" className="w-full">
                  Edit Profile
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ 
                    delay: 0.3 + (index * 0.15),
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{
                    rotateX: 8,
                    rotateY: 5,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Card hover>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                          stat.color === 'green' ? 'bg-green-100 text-green-600' :
                          stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          <stat.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-sm text-gray-500">Your latest actions on the platform</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'view' ? 'bg-blue-500' :
                        activity.type === 'edit' ? 'bg-green-500' :
                        'bg-purple-500'
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
      </div>
    </div>
  );
}
