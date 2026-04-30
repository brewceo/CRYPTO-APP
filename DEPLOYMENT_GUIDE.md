# 🚀 Deployment Guide — Coinbase Clone Full-Stack App

**Student:** Akelisiyine Desmond Nsoh Brew

> **Important:** This is a student project for educational purposes only. Not affiliated with Coinbase, Inc.

---

## Table of Contents

1. [Local Development](#local-development)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
4. [Testing Checklist](#testing-checklist)
5. [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

- **Node.js:** v18 or higher  
- **pnpm:** Package manager (or npm/yarn)
- **MongoDB Atlas:** Free tier account (https://www.mongodb.com/cloud/atlas)

### 1. Setup Backend

```bash
cd backend

# Install dependencies
pnpm install

# Create .env file with these variables:
# PORT=5001
# MONGO_URI=your_mongodb_atlas_connection_string_here
# JWT_SECRET=generate_a_random_secret_string
# FRONTEND_URL=http://localhost:5173
# NODE_ENV=development

# Start development server
pnpm dev

# Optional: Seed the database with sample cryptocurrencies
pnpm seed
```

**Backend will run on:** `http://localhost:5001`

### 2. Setup Frontend

```bash
# In root directory
pnpm install

# Create .env file:
# VITE_API_URL=http://localhost:5001/api

# Start development server
pnpm dev
```

**Frontend will run on:** `http://localhost:5173`

### 3. Test the Full Stack Locally

1. Open `http://localhost:5173` in your browser
2. You should see the app with the warning banner at the top
3. Click **Sign Up** and create an account
4. After registration, you'll be logged in and redirected home
5. Click **Profile** in the navbar to see your user data
6. Click **Explore** to view cryptocurrencies
7. Click **+ Add Cryptocurrency** to add a new coin
8. Use the **Top Gainers** and **New listings** tabs on the home page

---

## Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and log in
3. Create a new cluster (free tier)
4. Under "Database Access," create a user:
   - Username: `cryptoapp`
   - Password: (strong password)
5. Under "Network Access," add your IP (or 0.0.0.0/0 for public access)
6. Copy the connection string:
   ```
   mongodb+srv://cryptoapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cryptodb?retryWrites=true&w=majority
   ```
   - Replace `YOUR_PASSWORD` with your database user password
   - Replace `cryptodb` with your preferred database name

### Step 2: Push Backend to GitHub

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/coinbase-backend.git
git push -u origin main
```

### Step 3: Deploy to Render

1. Go to https://render.com and sign up
2. Create a new **Web Service**
3. Connect your GitHub repository (backend)
4. Configure:
   - **Name:** `crypto-app-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   ```
   MONGO_URI=mongodb+srv://cryptoapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cryptodb?retryWrites=true&w=majority
   JWT_SECRET=your-very-long-random-secret-string-here
   FRONTEND_URL=https://YOUR-NETLIFY-DOMAIN.netlify.app
   NODE_ENV=production
   ```
   - Generate `JWT_SECRET` using: `openssl rand -hex 32`
   - Or any 32+ character random string
6. Click **Create Web Service**
7. Wait for deployment (~2-3 minutes)
8. Copy the deployed backend URL (e.g., `https://crypto-app-backend.onrender.com`)

### Step 4: Test Backend Deployment

Navigate to `https://crypto-app-backend.onrender.com` in your browser.

You should see:
```json
{
  "message": "Crypto App API is running — student project"
}
```

---

## Frontend Deployment (Netlify)

### Step 1: Prepare Frontend for Deployment

1. Update `index.html` title (already set to "Crypto App | Student Project")
2. Ensure `netlify.toml` exists (already configured)
3. Verify `src/components/WarningBanner.jsx` is imported in `App.jsx` (already done)

### Step 2: Push Frontend to GitHub

```bash
# In root directory (not backend/)
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/coinbase-frontend.git
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Go to https://netlify.com and sign in
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Choose your frontend repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add environment variables:
   ```
   VITE_API_URL=https://crypto-app-backend.onrender.com/api
   ```
   - (Use the backend URL from Step 4 of Backend Deployment)
7. Click **Deploy site**
8. Wait for build to complete (~1-2 minutes)

### Step 4: Configure Netlify Site Settings

1. Go to **Site settings**
2. Under **Domain management:**
   - Change site name to something **without "coinbase"**
   - Example: `desmond-crypto-app.netlify.app`
3. Keep the generated `.netlify.app` domain or add a custom domain

### Step 5: Update Backend FRONTEND_URL

Since you now have a Netlify domain, update your backend environment variables:

1. Go to Render dashboard
2. Select your backend service
3. Edit environment variable `FRONTEND_URL`:
   ```
   https://desmond-crypto-app.netlify.app
   ```
4. Redeploy backend

---

## Testing Checklist

### Backend Tests

- [ ] API health check: `GET https://crypto-app-backend.onrender.com/` returns message
- [ ] Register endpoint: `POST /api/register` with name, email, password
- [ ] Login endpoint: `POST /api/login` with email, password
- [ ] Get profile: `GET /api/profile` with JWT token (returns user data)
- [ ] Get all cryptos: `GET /api/crypto` (returns array of coins)
- [ ] Get top gainers: `GET /api/crypto/gainers` (returns top 6 by 24h change)
- [ ] Get new listings: `GET /api/crypto/new` (returns 6 newest coins)
- [ ] Add crypto: `POST /api/crypto` with name, symbol, price, etc.

### Frontend Tests

- [ ] Home page loads with warning banner at top
- [ ] Home page displays crypto ticker with 3 tabs
- [ ] Can navigate to Sign Up page
- [ ] Can see "Demo app – do not use your real password" notice
- [ ] Can create new account
- [ ] After signup, redirected to home and logged in
- [ ] Can view Profile page with name and email
- [ ] Can navigate to Explore page and see cryptocurrencies
- [ ] Can click "Add Cryptocurrency" button
- [ ] Can submit new cryptocurrency form
- [ ] After adding crypto, redirected to Explore
- [ ] Footer disclaimer visible on all pages
- [ ] Can logout successfully
- [ ] After logout, cannot access Profile (redirected to Sign In)

---

## Troubleshooting

### Backend Issues

**Error: "MongoDB connection failed"**
- Check `MONGO_URI` is correct
- Verify MongoDB Atlas user and password
- Check IP whitelist in MongoDB Atlas Network Access settings

**Error: "JWT_SECRET not defined"**
- Ensure `JWT_SECRET` is set in environment variables
- Restart the service after adding the variable

**Error: "CORS error from frontend"**
- Verify `FRONTEND_URL` environment variable matches your Netlify domain
- Check that `origin` in backend CORS matches exactly

### Frontend Issues

**Error: "Failed to load cryptocurrencies. Is the backend running?"**
- Check that `VITE_API_URL` environment variable is set correctly on Netlify
- Verify the backend is deployed and running
- Check network tab in browser DevTools for actual error

**Error: "Not authorised, no token provided"**
- Ensure HTTP-only cookies are being sent
- Check that `withCredentials: true` is set in axios config (already done in `/lib/api.js`)

**Page shows blank or 404**
- Verify `netlify.toml` has the redirect rule:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

---

## Final Submission

Submit to Google Form:

1. **Backend URL:** https://crypto-app-backend.onrender.com
2. **Frontend URL:** https://desmond-crypto-app.netlify.app
3. **GitHub Repository:** https://github.com/YOUR_USERNAME/coinbase-clone

**⚠️ Important:** All three links must be working and publicly accessible. No marks will be awarded for invalid or inaccessible submissions.

---

## Support

If you encounter any issues:

1. Check the Render and Netlify deployment logs
2. Verify all environment variables are set correctly
3. Test local development setup first before troubleshooting production
4. Use browser DevTools Network tab to inspect API calls

---

**Good luck with your deployment! 🎉**
