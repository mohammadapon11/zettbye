'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { randomBetween } from '@/utils/cn';

/**
 * Animated chart component with SVG animations
 */
export function AnimatedChart() {
  // Generate sample data
  const dataPoints = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleDateString('en-US', { month: 'short' }),
    value: randomBetween(20, 80),
  }));

  const maxValue = Math.max(...dataPoints.map(d => d.value));

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -20, y: 50 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.4,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        rotateX: 5,
        y: -5,
        transition: { duration: 0.3 }
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader>
          <motion.h3 
            className="text-lg font-semibold text-gray-900"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Activity Overview
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Monthly activity trends
          </motion.p>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="h-64 w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 200"
            className="overflow-visible"
          >
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((line) => (
              <motion.line
                key={line}
                x1="40"
                y1={40 + (line * 30)}
                x2="580"
                y2={40 + (line * 30)}
                stroke="#e5e7eb"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: line * 0.1, duration: 0.5 }}
              />
            ))}

            {/* Animated path */}
            <motion.path
              d={`M 50 ${160 - (dataPoints[0].value / maxValue) * 120} ${dataPoints
                .slice(1)
                .map(
                  (point, index) =>
                    `L ${70 + (index + 1) * 45} ${160 - (point.value / maxValue) * 120}`
                )
                .join(' ')}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            />

            {/* Animated dots with 3D effect */}
            {dataPoints.map((point, index) => (
              <motion.g key={index}>
                <motion.circle
                  cx={50 + index * 45}
                  cy={160 - (point.value / maxValue) * 120}
                  r="6"
                  fill="url(#dotGradient)"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ 
                    delay: 0.5 + (index * 0.1), 
                    type: 'spring',
                    stiffness: 400,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 2, 
                    rotate: 720,
                    transition: { duration: 0.3 }
                  }}
                />
                <motion.circle
                  cx={50 + index * 45}
                  cy={160 - (point.value / maxValue) * 120}
                  r="3"
                  fill="#ffffff"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.7 + (index * 0.1), 
                    type: 'spring'
                  }}
                />
              </motion.g>
            ))}
            
            {/* Gradient definitions */}
            <defs>
              <radialGradient id="dotGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </radialGradient>
            </defs>

            {/* X-axis labels */}
            {dataPoints.map((point, index) => (
              <motion.text
                key={index}
                x={50 + index * 45}
                y="185"
                textAnchor="middle"
                className="text-xs fill-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + (index * 0.05) }}
              >
                {point.month}
              </motion.text>
            ))}
          </svg>
          
          {/* 3D Background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />
        </motion.div>
      </CardContent>
      
      {/* Floating particles effect */}
      <motion.div className="absolute top-4 right-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              y: [-10, -20, -10],
              x: [0, 5, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: i * 8,
            }}
          />
        ))}
      </motion.div>
    </Card>
    </motion.div>
  );
}
