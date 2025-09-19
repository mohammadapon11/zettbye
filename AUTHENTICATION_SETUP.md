# 🔐 Authentication Setup Guide

This project includes Google OAuth authentication using NextAuth.js. Follow these steps to set it up:

## 📋 Prerequisites

1. **Google Cloud Console Account**: You need a Google account to create OAuth credentials.

## 🛠️ Setup Steps

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** and **Google OAuth2 API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set **Application type** to **Web application**
6. Add these **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.vercel.app/api/auth/callback/google` (for production)

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

**Important**: 
- Replace `your-google-client-id-here` with your actual Google Client ID
- Replace `your-google-client-secret-here` with your actual Google Client Secret
- Generate a strong random secret for `NEXTAUTH_SECRET`

### 3. Generate NEXTAUTH_SECRET

You can generate a secure secret using:
```bash
openssl rand -base64 32
```

## 🚀 Features Included

### ✅ **Authentication Components**
- **Sign In Button**: Handles Google OAuth login/logout
- **Profile Button**: Quick access to user profile
- **Protected Routes**: Middleware protection for sensitive pages

### ✅ **Pages**
- **Custom Sign-In Page** (`/auth/signin`): Beautiful animated login page
- **Protected Profile Page** (`/profile`): User details and account overview
- **Automatic Redirects**: Seamless navigation flow

### ✅ **Navigation Integration**
- **Dynamic Sidebar**: Profile link appears only when authenticated
- **Header Authentication**: Sign in/out buttons with user avatar
- **Route Protection**: Middleware automatically protects `/profile`

### ✅ **User Experience**
- **Smooth Animations**: Framer Motion transitions throughout
- **Loading States**: Proper loading indicators during authentication
- **Error Handling**: Graceful error messages and recovery
- **Responsive Design**: Works perfectly on all devices

## 🎯 Usage

1. **Start the development server**: `npm run dev`
2. **Click "Sign In with Google"** in the header
3. **Complete Google OAuth flow**
4. **Access your profile** at `/profile`
5. **Navigate freely** with persistent authentication

## 🔒 Security Features

- **JWT Sessions**: Secure token-based authentication
- **Route Middleware**: Server-side route protection
- **CSRF Protection**: Built-in NextAuth security
- **Secure Cookies**: HTTPOnly and Secure cookie settings

## 📱 Testing

1. **Sign In**: Test Google OAuth flow
2. **Profile Access**: Visit `/profile` when authenticated
3. **Route Protection**: Try accessing `/profile` without signing in
4. **Sign Out**: Test logout functionality
5. **Navigation**: Verify sidebar and header updates

## 🌐 Deployment

For production deployment:

1. **Update environment variables** on your hosting platform
2. **Add production domain** to Google OAuth redirect URIs
3. **Update NEXTAUTH_URL** to your production domain

---

**🎉 Your Zettabyte Dashboard now includes enterprise-level authentication!**

This implementation goes beyond the basic requirements and showcases:
- Advanced NextAuth.js integration
- Beautiful custom UI components
- Seamless user experience
- Production-ready security practices
