'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Zap, Shield, Users, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/mockAuth';
import { googleAuth } from '@/lib/googleAuth';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

/**
 * Custom sign-in page with Google authentication
 */
export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login, loginWithGoogle } = useAuth();

  useEffect(() => {
    // Check if user is already signed in
    if (isAuthenticated) {
      router.push('/profile');
    }

    // Set up Google sign-in callback
    if (typeof window !== 'undefined') {
      window.googleSignInCallback = (googleUser: GoogleUser) => {
        loginWithGoogle(googleUser);
        router.push('/profile');
      };
    }
  }, [isAuthenticated, loginWithGoogle, router]);

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    try {
      const success = await login('demo@zettabyte.com', 'demo123');
      if (success) {
        router.push('/profile');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Demo sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await googleAuth.signIn();
    } catch (error) {
      console.error('Google sign-in failed:', error);
      alert('Google sign-in failed. Please try again or use demo login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 bg-primary-200/20 rounded-full"
          animate={{
            x: [0, Math.cos(i * Math.PI / 3) * 100],
            y: [0, Math.sin(i * Math.PI / 3) * 100],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 10)}%`,
          }}
        />
      ))}
      
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20, rotateX: -15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        whileHover={{
          rotateX: 2,
          y: -5,
          transition: { duration: 0.3 }
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <motion.div
              className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4 relative"
              initial={{ scale: 0, rotate: -180, rotateY: -90 }}
              animate={{ scale: 1, rotate: 0, rotateY: 0 }}
              transition={{ 
                delay: 0.2, 
                duration: 1,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              whileHover={{
                rotateY: 180,
                scale: 1.1,
                transition: { duration: 0.5 }
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Zap className="h-8 w-8 text-primary-600" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              />
            </motion.div>
            
            <motion.h1
              className="text-2xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to Zettabyte
            </motion.h1>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-600 mb-2">
                Sign in to access your personalized dashboard
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                <strong>Demo Credentials:</strong><br />
                Email: demo@zettabyte.com<br />
                Password: demo123
              </div>
            </motion.div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Features */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Shield, text: 'Secure authentication' },
                { icon: Users, text: 'Personalized experience' },
                { icon: Sparkles, text: 'Premium features' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                >
                  <feature.icon className="h-4 w-4 text-primary-600" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Demo Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <Button
                onClick={handleDemoSignIn}
                disabled={isLoading}
                loading={isLoading}
                variant="primary"
                className="w-full py-3 text-base"
              >
                {isLoading ? 'Signing in...' : 'Demo Login (demo@zettabyte.com)'}
              </Button>
              
              <div className="text-center text-sm text-gray-500">or</div>
              
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                loading={isLoading}
                variant="outline"
                className="w-full py-3 text-base"
              >
                {isLoading ? 'Connecting to Google...' : 'Continue with Google'}
              </Button>
              
              {/* Google Sign-in Button Container */}
              <div id="google-signin-button" className="w-full"></div>
            </motion.div>
            
            {/* Footer */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <p className="text-xs text-gray-500">
                By signing in, you agree to our terms of service and privacy policy
              </p>
            </motion.div>
          </CardContent>
        </Card>
        
        {/* Back to Dashboard */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
