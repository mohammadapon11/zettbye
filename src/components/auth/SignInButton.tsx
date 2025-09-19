'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/mockAuth';
import { googleAuth } from '@/lib/googleAuth';
import { useEffect } from 'react';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

/**
 * Authentication button component with Google sign-in
 */
export function SignInButton() {
  const { user, isAuthenticated, logout, loginWithGoogle } = useAuth();

  useEffect(() => {
    // Set up Google sign-in callback
    if (typeof window !== 'undefined') {
      window.googleSignInCallback = (googleUser: GoogleUser) => {
        loginWithGoogle(googleUser);
      };
    }
  }, [loginWithGoogle]);

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <motion.div
          className="flex items-center space-x-2 text-sm text-gray-700"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name || 'User'}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="font-medium hidden md:inline">
            {user?.name}
          </span>
        </motion.div>
        <Button
          onClick={async () => {
            await googleAuth.signOut();
            logout();
          }}
          variant="outline"
          size="sm"
          icon={<LogOut className="h-4 w-4" />}
        >
          <span className="hidden md:inline">Sign Out</span>
        </Button>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleAuth.signIn();
    } catch (error) {
      console.error('Google sign-in failed:', error);
      // Fallback to sign-in page
      window.location.href = '/auth/signin';
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="primary"
      size="sm"
      icon={<LogIn className="h-4 w-4" />}
    >
      Sign In with Google
    </Button>
  );
}

/**
 * Profile navigation button
 */
export function ProfileButton() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2"
      onClick={() => window.location.href = '/profile'}
    >
      <User className="h-5 w-5" />
    </Button>
  );
}
