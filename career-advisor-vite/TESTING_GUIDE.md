# 🧪 Authentication Testing Guide

## Prerequisites
- ✅ MongoDB Atlas connected
- ✅ Backend running on port 5000
- ✅ Frontend running on port 5173

---

## Step-by-Step Testing

### 1. Start Backend
```bash
cd "d:\Education Purpose\FSD project\career-advisor-backend"
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: cluster0.xlspl57.mongodb.net
```

✅ If you see this, backend is ready!

---

### 2. Seed Database (First Time Only)
```bash
node utils/seedCareers.js
```

**Expected Output:**
```
✅ Careers seeded successfully
```

---

### 3. Start Frontend
```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm run dev
```

**Expected Output:**
```
VITE v7.3.1  ready in 446 ms
➜  Local:   http://localhost:5173/
```

✅ Browser should open automatically

---

## Test 1: User Registration

### Steps:
1. Open http://localhost:5173
2. Click "Get Started" or navigate to /signup
3. Fill the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Password**: password123
   - **Confirm Password**: password123
4. Click "Sign Up"

### Expected Results:
✅ No errors in console
✅ Success message or redirect
✅ Redirected to /profile-setup
✅ Token stored in localStorage
✅ User data stored in localStorage

### Verify in Browser Console (F12):
```javascript
// Check token
localStorage.getItem('token')
// Should return: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Check user
JSON.parse(localStorage.getItem('user'))
// Should return: { id: "...", name: "John Doe", email: "john@example.com", ... }
```

---

## Test 2: User Login

### Steps:
1. Navigate to /login
2. Enter credentials:
   - **Email**: john@example.com
   - **Password**: password123
3. Click "Login"

### Expected Results:
✅ No errors in console
✅ Success message
✅ Redirected to /dashboard
✅ Token stored in localStorage
✅ User data stored in localStorage

### Verify:
```javascript
localStorage.getItem('token')
JSON.parse(localStorage.getItem('user'))
```

---

## Test 3: Protected Routes

### Test 3A: Access Without Login
1. Clear localStorage:
   ```javascript
   localStorage.clear()
   ```
2. Try to access: http://localhost:5173/dashboard

### Expected Results:
✅ Automatically redirected to /login
✅ Cannot access dashboard without token

### Test 3B: Access With Login
1. Login first (Test 2)
2. Navigate to /dashboard

### Expected Results:
✅ Dashboard loads successfully
✅ User data displayed
✅ No redirect to login

---

## Test 4: API Integration

### Test 4A: Check Token in Requests
1. Login successfully
2. Open Browser DevTools (F12)
3. Go to Network tab
4. Navigate to /dashboard
5. Look for API requests

### Expected Results:
✅ Requests have `Authorization: Bearer <token>` header
✅ API returns data successfully

### Test 4B: Invalid Token
1. Login successfully
2. Manually change token in localStorage:
   ```javascript
   localStorage.setItem('token', 'invalid-token')
   ```
3. Refresh page or navigate to /dashboard

### Expected Results:
✅ API returns 401 error
✅ Automatically logged out
✅ Redirected to /login
✅ localStorage cleared

---

## Test 5: Form Validation

### Test 5A: Signup Validation
1. Go to /signup
2. Try to submit empty form

### Expected Results:
✅ Shows "Name is required"
✅ Shows "Email is required"
✅ Shows "Password is required"

### Test 5B: Email Validation
1. Enter invalid email: "notanemail"
2. Try to submit

### Expected Results:
✅ Shows "Email is invalid"

### Test 5C: Password Validation
1. Enter password: "123" (less than 6 characters)
2. Try to submit

### Expected Results:
✅ Shows "Password must be at least 6 characters"

### Test 5D: Password Match
1. Password: "password123"
2. Confirm Password: "password456"
3. Try to submit

### Expected Results:
✅ Shows "Passwords do not match"

---

## Test 6: Error Handling

### Test 6A: Duplicate Email
1. Register with: john@example.com
2. Try to register again with same email

### Expected Results:
✅ Shows "User already exists" error

### Test 6B: Wrong Password
1. Try to login with wrong password

### Expected Results:
✅ Shows "Invalid credentials" error

### Test 6C: Network Error
1. Stop backend server
2. Try to login

### Expected Results:
✅ Shows error message
✅ Doesn't crash the app

---

## Test 7: Loading States

### Test 7A: Signup Loading
1. Fill signup form
2. Click "Sign Up"
3. Observe button

### Expected Results:
✅ Button shows "Creating Account..."
✅ Button is disabled during request

### Test 7B: Login Loading
1. Fill login form
2. Click "Login"
3. Observe button

### Expected Results:
✅ Button shows "Logging in..."
✅ Button is disabled during request

---

## Test 8: Logout Functionality

### Steps:
1. Login successfully
2. Go to /dashboard
3. Click "Logout" button

### Expected Results:
✅ localStorage cleared
✅ Redirected to /login
✅ Cannot access protected routes

---

## Test 9: Multiple Users

### Steps:
1. Register user 1: john@example.com
2. Logout
3. Register user 2: jane@example.com
4. Logout
5. Login as user 1
6. Check dashboard

### Expected Results:
✅ Each user has separate data
✅ Correct user data displayed
✅ No data mixing between users

---

## Test 10: Browser Refresh

### Steps:
1. Login successfully
2. Navigate to /dashboard
3. Refresh browser (F5)

### Expected Results:
✅ Still logged in
✅ Dashboard still accessible
✅ Token persists in localStorage

---

## Verification Checklist

### Backend
- [ ] Server running on port 5000
- [ ] MongoDB Atlas connected
- [ ] Database seeded with careers
- [ ] No errors in terminal

### Frontend
- [ ] Vite running on port 5173
- [ ] No errors in browser console
- [ ] No CORS errors

### Authentication
- [ ] Signup works
- [ ] Login works
- [ ] Token stored in localStorage
- [ ] User data stored in localStorage
- [ ] Protected routes work
- [ ] Redirect to login when not authenticated
- [ ] Auto logout on 401

### Forms
- [ ] Validation works
- [ ] Error messages display
- [ ] Loading states work
- [ ] Password toggle works

### API
- [ ] Token sent in requests
- [ ] API returns data
- [ ] Error handling works

---

## Common Issues & Fixes

### Issue: "Cannot connect to backend"
**Fix**: Check backend is running on port 5000

### Issue: "CORS error"
**Fix**: Check backend CORS configuration

### Issue: "MongoDB connection failed"
**Fix**: Check MongoDB Atlas connection string in .env

### Issue: "Token not found"
**Fix**: Login again to get new token

### Issue: "Redirect loop"
**Fix**: Clear localStorage and login again

---

## Success Indicators

✅ Backend console: "Server running on port 5000"
✅ Backend console: "MongoDB Connected"
✅ Frontend opens in browser
✅ Can register new user
✅ Can login with credentials
✅ Dashboard shows user data
✅ Protected routes redirect to login when not authenticated
✅ Token persists after refresh
✅ Logout clears data and redirects

---

## Browser Console Commands

### Check Authentication
```javascript
// Check if logged in
localStorage.getItem('token') !== null

// Get user data
JSON.parse(localStorage.getItem('user'))

// Get token
localStorage.getItem('token')
```

### Manual Logout
```javascript
localStorage.clear()
window.location.href = '/login'
```

### Test API Call
```javascript
fetch('http://localhost:5000/api/careers', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(res => res.json())
.then(data => console.log(data))
```

---

## 🎉 If All Tests Pass

Your authentication system is working perfectly!

**You now have:**
- ✅ Secure JWT authentication
- ✅ Protected routes
- ✅ MongoDB Atlas integration
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Auto logout
- ✅ Token management

**Your full stack application is ready for presentation! 🚀**

---

## Next: Test Full User Flow

1. Register → Profile Setup → Assessment → Results → Dashboard
2. Test all features with authentication
3. Verify data persistence
4. Test on different browsers
5. Test responsive design

**Everything is complete and working! 🎊**
