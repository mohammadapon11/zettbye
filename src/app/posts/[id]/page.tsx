'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorBoundary';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/lib/constants';
import { Post } from '@/types';
import { formatDate } from '@/utils/cn';
import { useParams } from 'next/navigation';

/**
 * Dynamic post detail page
 */
export default function PostDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { data: post, loading, error, retry } = useFetch<Post>(
    id && !isNaN(Number(id)) ? `${API_ENDPOINTS.POSTS}/${id}` : ''
  );
  
  // Validate ID parameter
  if (!id || isNaN(Number(id))) {
    return (
      <ErrorState
        error="Invalid post ID"
        title="Post not found"
      />
    );
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading post..." />;
  }

  if (error || !post) {
    return (
      <ErrorState
        error={error || 'Post not found'}
        onRetry={retry}
        title="Failed to load post"
      />
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link href="/posts">
          <Button
            variant="ghost"
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Posts
          </Button>
        </Link>
      </motion.div>

      {/* Post Content */}
      <Card>
        <CardHeader>
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>User {post.userId}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(new Date())}</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 className="h-4 w-4" />}
            >
              Share
            </Button>
          </motion.div>
          
          <motion.h1
            className="text-3xl font-bold text-gray-900 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            {post.title}
          </motion.h1>
        </CardHeader>
        
        <CardContent>
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-700 leading-relaxed text-lg">
              {post.body}
            </p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Related Actions */}
      <motion.div
        className="flex items-center justify-center space-x-4 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="primary">
          Like Post
        </Button>
        <Button variant="outline">
          Save for Later
        </Button>
        <Button variant="ghost">
          Report
        </Button>
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="flex items-center justify-between pt-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div>
          {parseInt(id) > 1 && (
            <Link href={`/posts/${parseInt(id) - 1}`}>
              <Button variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
                Previous Post
              </Button>
            </Link>
          )}
        </div>
        <div>
          <Link href={`/posts/${parseInt(id) + 1}`}>
            <Button variant="outline">
              Next Post
              <ArrowLeft className="h-4 w-4 rotate-180 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}