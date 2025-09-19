'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Post } from '@/types';
import { truncateText } from '@/utils/cn';

interface PostCardProps {
  post: Post;
  index: number;
}

/**
 * Animated post card component with staggered entrance
 */
export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ 
        y: -10,
        rotateX: 8,
        rotateY: 5,
        scale: 1.03,
        transition: { duration: 0.3, type: 'spring', stiffness: 400 }
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <Card hover clickable className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <User className="h-4 w-4" />
            <span>User {post.userId}</span>
          </div>
          <motion.h3
            className="text-lg font-semibold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (index * 0.1) + 0.2 }}
          >
            {truncateText(post.title, 60)}
          </motion.h3>
        </CardHeader>
        
        <CardContent className="flex-1">
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (index * 0.1) + 0.3 }}
          >
            {truncateText(post.body, 120)}
          </motion.p>
        </CardContent>
        
        <CardFooter>
          <Link href={`/posts/${post.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full group"
              icon={
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              }
            >
              Read More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
