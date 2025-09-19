'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
  index: number;
}

/**
 * Animated statistics card component
 */
export function StatsCard({ title, value, change, icon: Icon, color, index }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-50',
    green: 'bg-green-500 text-green-50',
    purple: 'bg-purple-500 text-purple-50',
    orange: 'bg-orange-500 text-orange-50',
  };

  const changeColorClasses = change && change > 0 
    ? 'text-green-600 bg-green-50' 
    : 'text-red-600 bg-red-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ 
        y: -12,
        rotateX: 8,
        rotateY: 8,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        transition: { duration: 0.3, type: "spring", stiffness: 400 }
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <motion.p 
                className="text-2xl font-bold text-gray-900 mt-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index * 0.1) + 0.3, type: 'spring' }}
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
              </motion.p>
              {change && (
                <motion.div
                  className={cn(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2',
                    changeColorClasses
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + 0.5 }}
                >
                  {change > 0 ? '+' : ''}{change}%
                </motion.div>
              )}
            </div>
            <motion.div
              className={cn(
                'p-3 rounded-full relative',
                colorClasses[color]
              )}
              initial={{ rotate: 0, scale: 0.8, rotateY: -90 }}
              animate={{ rotate: 360, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: (index * 0.15) + 0.3,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{
                rotateY: 180,
                scale: 1.1,
                transition: { duration: 0.4 }
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Icon className="h-6 w-6" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index * 0.15) + 0.5 }}
              />
            </motion.div>
          </div>
        </CardContent>
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}
