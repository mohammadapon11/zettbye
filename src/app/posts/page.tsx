'use client';

import { motion } from 'framer-motion';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { PostCard } from '@/components/posts/PostCard';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorBoundary';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { API_ENDPOINTS } from '@/lib/constants';
import { Post } from '@/types';

/**
 * Posts listing page with search and filtering
 */
export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { 
    data: posts, 
    loading, 
    error, 
    retry 
  } = useFetch<Post[]>(simulateError ? API_ENDPOINTS.INVALID : API_ENDPOINTS.POSTS);

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    post.body.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const handleSimulateError = () => {
    setSimulateError(true);
  };

  const handleRetry = () => {
    setSimulateError(false);
    retry();
  };

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={handleRetry}
        title="Failed to load posts"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">
            Explore all posts ({filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'})
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleSimulateError}
            variant="outline"
            size="sm"
            icon={<AlertCircle className="h-4 w-4" />}
          >
            Test Error
          </Button>
          <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        className="relative max-w-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </motion.div>

      {/* Loading State */}
      {loading && <LoadingSpinner size="lg" text="Loading posts..." />}

      {/* Posts Grid */}
      {!loading && filteredPosts.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {!loading && filteredPosts.length === 0 && posts && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-gray-500 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No posts found</h3>
            <p className="text-sm">Try adjusting your search query</p>
          </div>
          {searchQuery && (
            <Button
              onClick={() => setSearchQuery('')}
              variant="outline"
              size="sm"
            >
              Clear Search
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
