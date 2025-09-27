# Vercel Deployment Guide

## Files Added for Vercel Deployment

### 1. `vercel.json` - Vercel Configuration
This file configures how Vercel handles your static HTML application:
- **Builds**: Defines how to build static assets (HTML, CSS, JS, images)
- **Routes**: Maps URLs to specific HTML files for proper navigation
- **Clean URLs**: Enables clean URLs without `.html` extensions
- **Static File Serving**: Properly serves assets from `/assets`, `/css`, `/js`, and `/public` directories

### 2. `package.json` - Project Metadata
Provides project information and dependencies for Vercel to understand your project structure.

### 3. `.gitignore` - Version Control
Excludes unnecessary files from deployment and version control.

## Deployment Steps

### Option 1: Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project directory: `cd pepsico-time-off`
3. Login to Vercel: `vercel login`
4. Deploy: `vercel`
5. Follow the prompts to configure your project

### Option 2: GitHub Integration
1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import the repository in Vercel dashboard
4. Vercel will automatically detect the configuration and deploy

## URL Structure After Deployment

Your application will be accessible with clean URLs:
- **Home/Login**: `https://your-app.vercel.app/`
- **Overview**: `https://your-app.vercel.app/overview`
- **Schedule**: `https://your-app.vercel.app/schedule`
- **Send Request**: `https://your-app.vercel.app/sendrequest`
- **Notifications**: `https://your-app.vercel.app/notification`

## Troubleshooting

### Common Issues:
1. **404 Errors**: Ensure `vercel.json` is in the root directory
2. **Asset Loading Issues**: Verify all paths use relative references (`./assets/`, `./css/`, etc.)
3. **Navigation Issues**: Check that all internal links use the correct format

### Verification Checklist:
- ✅ `vercel.json` exists in root directory
- ✅ All asset paths are relative (start with `./`)
- ✅ Navigation links work with clean URLs
- ✅ JavaScript files are properly referenced
- ✅ CSS files load correctly

## Changes Made for Vercel Compatibility

1. **Fixed JavaScript Navigation**: Updated `overview.js` to redirect to `/` instead of `login.html`
2. **Added Vercel Configuration**: Created comprehensive routing rules for all pages
3. **Verified Asset Paths**: Confirmed all assets use relative paths
4. **Added Project Metadata**: Created `package.json` for better project recognition

Your project is now ready for Vercel deployment! 🚀