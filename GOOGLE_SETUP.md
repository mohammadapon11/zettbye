# 🔐 Google OAuth Setup Guide

## Quick Setup (5 minutes)

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** and **Google Identity Services**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set **Application type** to **Web application**
6. Add **Authorized JavaScript origins**:
   - `http://localhost:3001` (for development)
   - `https://your-domain.com` (for production)
7. Add **Authorized redirect URIs**:
   - `http://localhost:3001` (for development)
   - `https://your-domain.com` (for production)

### 2. Environment Variables

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id-here
```

**Example:**
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### 3. Test Google Login

1. Start the development server: `npm run dev`
2. Go to `http://localhost:3001`
3. Click **"Sign In with Google"**
4. Complete Google OAuth flow
5. You'll be redirected to the profile page

## 🚀 Features

- ✅ **Google Identity Services**: Latest Google OAuth implementation
- ✅ **One-Tap Sign-In**: Automatic sign-in prompts
- ✅ **Fallback Demo**: Demo login still available
- ✅ **Real User Data**: Gets actual Google profile info
- ✅ **Secure Tokens**: JWT token handling
- ✅ **Auto Redirect**: Seamless profile navigation

## 🔧 How It Works

1. **Google Identity Services** loads automatically
2. **JWT Token** received from Google
3. **User Profile** extracted from token
4. **Zustand Store** saves authentication state
5. **Persistent Login** across browser sessions

## 🎯 Testing Without Setup

If you don't have Google OAuth set up yet, you can still test with:

**Demo Credentials:**
- Email: `demo@zettabyte.com`
- Password: `demo123`

## 🌐 Production Deployment

1. Update environment variables on hosting platform
2. Add production domain to Google OAuth settings
3. Deploy and test

---

**Your Google authentication is now production-ready! 🎉**
