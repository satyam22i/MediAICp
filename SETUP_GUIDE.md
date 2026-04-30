# MediAI Development Setup Guide

## 🚀 Quick Start - Run Backend & Frontend Together

### Prerequisites
- Node.js and npm installed
- MongoDB connection string in `.env` (already configured)
- Backend and Frontend in separate terminals

---

## Step 1: Start the Backend Server

Open **Terminal 1** and run:

```bash
cd d:\MediAI\backend
npm run dev
```

**Expected Output:**
```
🔌 Server running on port 5000
MongoDB Connected: cluster0.eal2zlm.mongodb.net
```

---

## Step 2: Start the Frontend Development Server

Open **Terminal 2** and run:

```bash
cd d:\MediAI\Frontend
npm run dev
```

**Expected Output:**
```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

---

## ✅ API Configuration

The frontend now **automatically detects the environment** and connects to the correct backend:

- **Development Mode** (npm run dev): `http://localhost:5000/api`
- **Production Mode**: `https://mediai-1hpm.onrender.com/api`

Check the **browser console** for:
```
🔌 API Base URL: http://localhost:5000/api
🚀 Environment: DEVELOPMENT
```

---

## 🔧 Signup Flow (Fixed Issues)

1. User enters email, password, full name
2. Click "Sign Up"
3. Frontend sends request to `http://localhost:5000/api/auth/signup`
4. Backend creates user with verification token
5. Backend sends verification email
6. User checks email for verification link
7. User verifies email
8. User can now login

**If email sending fails (SMTP):**
- Check browser console
- A dev verification link will be printed to backend console
- Copy and paste in browser to verify

---

## 🐛 Troubleshooting

### Signup is stuck/not responding
1. Check if backend is running on port 5000
2. Check browser console for network errors
3. Verify `MONGO_URI` in `.env` is correct
4. Check backend logs for database connection issues

### Email verification not working
1. Check `.env` has valid email credentials:
   - `EMAIL_USER=satyam.techtitans@gmail.com`
   - `EMAIL_PASS=ziwn ztbb iept uvkm`
2. If SMTP fails, use the dev link from backend console
3. Check spam folder for verification email

### API endpoints not found (404 errors)
1. Verify backend routes are set up:
   - `/api/auth/signup` ✓
   - `/api/auth/login` ✓
   - `/api/auth/verify-email` ✓
   - `/api/auth/forgot-password` ✓
   - `/api/auth/reset-password` ✓

---

## 📝 Environment Variables

**Backend `.env`:**
```
PORT=5000
MONGO_URI=mongodb+srv://satyamkum2020_db_user:dAX6SAfdqZKpsa9H@cluster0.eal2zlm.mongodb.net/?appName=Cluster0
JWT_SECRET=your_super_secret_key_123
GEMINI_API_KEY=AIzaSyDVKu-kaLllcHa-9zNZHW1-X6hr8RruQs0
EMAIL_USER=satyam.techtitans@gmail.com
EMAIL_PASS=ziwn ztbb iept uvkm
FRONTEND_URL=http://localhost:5173
```

**Frontend:** Uses Vite environment detection (no .env needed for localhost)

---

## 🎯 Next Steps After Signup Works

1. Complete login flow
2. Test AI endpoints (symptoms, medicine, mental health)
3. Deploy to production
4. Change hardcoded URLs to production domain

---

## 📞 Common Commands

**Backend:**
```bash
npm run dev          # Development with nodemon
npm start            # Production
```

**Frontend:**
```bash
npm run dev          # Development with Vite
npm run build        # Production build
npm run preview      # Preview production build
```
