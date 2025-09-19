'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (googleUser: GoogleUser) => void;
  logout: () => void;
}

/**
 * Mock authentication store using Zustand
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Demo authentication
        if (email === 'demo@zettabyte.com' && password === 'demo123') {
          const user = {
            id: '1',
            name: 'Demo User',
            email: 'demo@zettabyte.com',
            image: 'https://via.placeholder.com/100x100?text=DU'
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      loginWithGoogle: (googleUser: GoogleUser) => {
        const user = {
          id: googleUser.id,
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.picture
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
