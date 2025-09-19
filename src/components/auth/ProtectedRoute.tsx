'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ErrorState } from '@/components/ui/ErrorBoundary';
import { useAuth } from '@/lib/mockAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * Protected route component that requires authentication
 */
export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, requireAuth, router]);

  if (requireAuth && !isAuthenticated) {
    return (
      <ErrorState
        error="You need to sign in to access this page"
        title="Authentication Required"
      />
    );
  }

  return <>{children}</>;
}
