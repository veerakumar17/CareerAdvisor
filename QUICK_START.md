# 🚀 QUICK START - Run Your Full Stack Project

## Prerequisites
- ✅ Node.js installed
- ✅ MongoDB installed and running

---

## Step 1: Start MongoDB (if not running)
```bash
net start MongoDB
```

---

## Step 2: Start Backend

### Open Terminal 1
```bash
cd "d:\Education Purpose\FSD project\career-advisor-backend"
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost
```

✅ Backend running at: **http://localhost:5000**

---

## Step 3: Start Frontend

### Open Terminal 2
```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm run dev
```

**Expected Output:**
```
VITE v7.3.1  ready in 446 ms
➜  Local:   http://localhost:5173/
```

✅ Frontend running at: **http://localhost:5173**

---

## Step 4: Test the Application

### Open Browser
Go to: **http://localhost:5173**

### Test Flow
1. **Home Page** → Click "Get Started"
2. **Signup** → Create account
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. **Check Console** → Should see success message
4. **Check localStorage** → Should have token and user
5. **Login** → Use same credentials
6. **Dashboard** → Should show user data and recommendations

---

## Verify Everything Works

### Check Backend
```bash
curl http://localhost:5000
```
Should return: `{"message": "AI Career Advisor API is running"}`

### Check Frontend
Open browser console (F12) and type:
```javascript
localStorage.getItem('token')
JSON.parse(localStorage.getItem('user'))
```

---

## Common Issues

### Port 5000 in use?
Change in backend `.env`:
```
PORT=5001
```

### Port 5173 in use?
Vite will automatically use 5174

### MongoDB not running?
```bash
net start MongoDB
```

### CORS error?
Check backend `server.js` has:
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

---

## API Endpoints

- **Register**: POST http://localhost:5000/api/auth/register
- **Login**: POST http://localhost:5000/api/auth/login
- **Careers**: GET http://localhost:5000/api/careers
- **Recommend**: POST http://localhost:5000/api/recommend

---

## Project Structure

```
FSD project/
├── career-advisor-backend/    # Terminal 1
│   └── npm run dev
│
└── career-advisor-vite/       # Terminal 2
    └── npm run dev
```

---

## Success Indicators

✅ Backend console shows "Server running on port 5000"
✅ Backend console shows "MongoDB Connected"
✅ Frontend opens in browser automatically
✅ No errors in browser console
✅ Can signup and login
✅ Dashboard shows user data

---

## That's It!

Your full stack application is running!

**Frontend**: http://localhost:5173
**Backend**: http://localhost:5000

---

## Need Help?

Check these files:
- **PROJECT_COMPLETE.md** - Full overview
- **INTEGRATION_CHECKLIST.md** - Detailed checklist
- **API_USAGE_EXAMPLES.md** - Code examples

---

**Enjoy your Full Stack Project! 🎉**
