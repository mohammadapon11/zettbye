'use client';

interface GoogleResponse {
  credential: string;
}

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface GoogleAccounts {
  id: {
    initialize: (config: GoogleConfig) => void;
    prompt: (callback?: (notification: GoogleNotification) => void) => void;
    renderButton: (element: HTMLElement | null, options: GoogleButtonOptions) => void;
    disableAutoSelect: () => void;
  };
}

interface GoogleConfig {
  client_id: string;
  callback: (response: GoogleResponse) => void;
  auto_select: boolean;
  cancel_on_tap_outside: boolean;
}

interface GoogleNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
}

interface GoogleButtonOptions {
  theme: string;
  size: string;
  width: string;
}

declare global {
  interface Window {
    google: {
      accounts: GoogleAccounts;
    };
    googleSignInCallback: (response: GoogleUser) => void;
  }
}

/**
 * Google OAuth implementation using Google Identity Services
 */
export class GoogleAuth {
  private clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'demo-client-id';
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve) => {
      // Load Google Identity Services script
      if (!document.querySelector('script[src*="accounts.google.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this.setupGoogleSignIn();
          this.isInitialized = true;
          resolve();
        };
        document.head.appendChild(script);
      } else {
        this.setupGoogleSignIn();
        this.isInitialized = true;
        resolve();
      }
    });
  }

  private setupGoogleSignIn(): void {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }

  private async handleCredentialResponse(response: GoogleResponse): Promise<void> {
    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const user: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      // Trigger custom callback
      if (window.googleSignInCallback) {
        window.googleSignInCallback(user);
      }
    } catch (error) {
      console.error('Error handling Google sign-in:', error);
    }
  }

  async signIn(): Promise<void> {
    await this.initialize();
    
    if (!window.google) {
      throw new Error('Google Sign-In not available');
    }

    // Show Google One Tap or sign-in prompt
    window.google.accounts.id.prompt((notification: GoogleNotification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to popup
        this.showPopup();
      }
    });
  }

  private showPopup(): void {
    if (!window.google) return;

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
      }
    );
  }

  async signOut(): Promise<void> {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}

export const googleAuth = new GoogleAuth();
