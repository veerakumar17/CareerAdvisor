# Frontend-Backend Integration Guide

## ✅ Setup Complete

### API Service Created: `src/services/api.js`

## 🔧 Configuration

### Axios Instance
```javascript
baseURL: 'http://localhost:5000/api'
headers: { 'Content-Type': 'application/json' }
```

### Request Interceptor
Automatically adds JWT token to all requests:
```javascript
Authorization: Bearer <token>
```

### Response Interceptor
Handles 401 errors (unauthorized) by:
- Removing token and user from localStorage
- Redirecting to login page

## 📡 API Functions

### Authentication
```javascript
import { authAPI } from '../services/api';

// Register
const response = await authAPI.register({ name, email, password });

// Login
const response = await authAPI.login({ email, password });
```

### Careers
```javascript
import { careerAPI } from '../services/api';

// Get all careers
const response = await careerAPI.getAll();

// Get single career
const response = await careerAPI.getById(id);
```

### Recommendations
```javascript
import { recommendAPI } from '../services/api';

// Get recommendations
const response = await recommendAPI.getRecommendations({ 
  skills: ['JavaScript', 'React', 'Python'] 
});
```

## 🔐 Token Management

### Store Token (After Login/Register)
```javascript
const { user, token } = response.data;

if (token) {
  localStorage.setItem('token', token);
}
localStorage.setItem('user', JSON.stringify(user));
```

### Get User Data
```javascript
const user = JSON.parse(localStorage.getItem('user'));
```

### Logout
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
navigate('/login');
```

## 📝 Updated Components

### Login.jsx
- ✅ API integration with authAPI.login()
- ✅ Token storage in localStorage
- ✅ User data storage
- ✅ Error handling
- ✅ Loading state
- ✅ Redirect to dashboard on success

### Signup.jsx
- ✅ API integration with authAPI.register()
- ✅ Token storage in localStorage
- ✅ User data storage
- ✅ Error handling
- ✅ Loading state
- ✅ Redirect to profile-setup on success

### Dashboard.jsx
- ✅ Fetch user from localStorage
- ✅ Redirect to login if not authenticated
- ✅ Fetch career recommendations
- ✅ Display user data
- ✅ Logout functionality
- ✅ Loading state

## 🚀 Usage Examples

### Example 1: Login Flow
```javascript
// User enters credentials
const formData = { email: 'user@example.com', password: 'password123' };

// Call API
const response = await authAPI.login(formData);

// Store data
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));

// Redirect
navigate('/dashboard');
```

### Example 2: Protected Route
```javascript
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    navigate('/login');
  }
}, [navigate]);
```

### Example 3: API Call with Token
```javascript
// Token is automatically added by interceptor
const response = await careerAPI.getAll();
console.log(response.data);
```

### Example 4: Error Handling
```javascript
try {
  const response = await authAPI.login(formData);
  // Success
} catch (error) {
  const message = error.response?.data?.message || 'An error occurred';
  setErrors({ email: message });
}
```

## 🔄 Complete Flow

### Registration → Login → Dashboard

1. **User Registers**
   - POST /api/auth/register
   - Receives token + user data
   - Stores in localStorage
   - Redirects to /profile-setup

2. **User Logs In**
   - POST /api/auth/login
   - Receives token + user data
   - Stores in localStorage
   - Redirects to /dashboard

3. **Dashboard Loads**
   - Reads user from localStorage
   - Fetches recommendations with user skills
   - Displays personalized data

4. **User Logs Out**
   - Clears localStorage
   - Redirects to /login

## 🛡️ Security Features

- ✅ JWT token in Authorization header
- ✅ Token stored in localStorage
- ✅ Automatic token injection
- ✅ 401 error handling
- ✅ Automatic logout on unauthorized

## 🧪 Testing

### Test Login
1. Start backend: `npm run dev` (in backend folder)
2. Start frontend: `npm run dev` (in frontend folder)
3. Go to http://localhost:5173/login
4. Enter credentials
5. Check browser console for response
6. Check localStorage for token and user

### Test API Calls
```javascript
// Open browser console on any page
const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const token = localStorage.getItem('token');
console.log(token);
```

## 📋 Checklist

- [x] API service created
- [x] Axios configured with baseURL
- [x] Request interceptor (token)
- [x] Response interceptor (401 handling)
- [x] Login component updated
- [x] Signup component updated
- [x] Dashboard component updated
- [x] Token storage implemented
- [x] Error handling added
- [x] Loading states added
- [x] Logout functionality added

## 🐛 Troubleshooting

### CORS Error
Backend must have CORS enabled for http://localhost:5173

### 401 Unauthorized
- Check if token is stored in localStorage
- Check if backend is validating token correctly

### Network Error
- Ensure backend is running on port 5000
- Check baseURL in api.js

### Token Not Sent
- Check request interceptor
- Verify token exists in localStorage

## 🎯 Next Steps

1. Add protected route wrapper
2. Add token refresh logic
3. Add user context/state management
4. Add more API endpoints
5. Add request/response logging

---

**Integration Complete! Frontend and Backend Connected! 🎉**
