'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  title?: string;
}

/**
 * Error state component with retry functionality
 */
export function ErrorState({ error, onRetry, title = 'Something went wrong' }: ErrorStateProps) {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[400px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-md w-full text-center">
        <CardContent className="p-8">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Inline error component for smaller spaces
 */
export function InlineError({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <motion.div
      className="bg-red-50 border border-red-200 rounded-lg p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
        <div className="flex-1">
          <p className="text-sm text-red-800">{error}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="ghost"
              size="sm"
              className="mt-2 text-red-600 hover:bg-red-100"
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
