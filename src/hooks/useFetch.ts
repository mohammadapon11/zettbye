'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '@/types';
import { delay } from '@/utils/cn';

interface FetchOptions {
  immediate?: boolean;
  delayMs?: number;
}

/**
 * Advanced fetch hook with error handling, loading states, and retry functionality
 */
export function useFetch<T>(
  url: string,
  options: FetchOptions = { immediate: true, delayMs: 800 }
): ApiResponse<T> & { refetch: () => void; retry: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate realistic loading time
      await delay(options.delayMs || 800);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options.delayMs]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    retry,
  };
}
