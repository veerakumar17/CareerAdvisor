# 🔗 Frontend-Backend Integration Guide

## Complete Full Stack Setup

### Backend: http://localhost:5000
### Frontend: http://localhost:5173

## Step-by-Step Integration

### 1. Start Backend

```bash
cd "d:\Education Purpose\FSD project\career-advisor-backend"
npm run dev
```

✅ Server running on port 5000
✅ MongoDB connected

### 2. Start Frontend

```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm run dev
```

✅ Vite running on port 5173

### 3. Install Axios in Frontend

```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm install axios
```

### 4. Create API Service

Create `src/services/api.js` in frontend:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Auth APIs
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Career APIs
export const getCareers = async () => {
  const response = await axios.get(`${API_URL}/careers`);
  return response.data;
};

export const getCareerById = async (id) => {
  const response = await axios.get(`${API_URL}/careers/${id}`);
  return response.data;
};

// Recommendation API
export const getRecommendations = async (skills) => {
  const response = await axios.post(`${API_URL}/recommend`, { skills });
  return response.data;
};
```

### 5. Update Login Component

Update `src/pages/Login.jsx`:

```javascript
import { login } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();
  if (Object.keys(newErrors).length === 0) {
    try {
      const data = await login(formData);
      console.log('Login successful', data);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ email: error.response?.data?.message || 'Login failed' });
    }
  } else {
    setErrors(newErrors);
  }
};
```

### 6. Update Signup Component

Update `src/pages/Signup.jsx`:

```javascript
import { register } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();
  if (Object.keys(newErrors).length === 0) {
    try {
      const data = await register(formData);
      console.log('Signup successful', data);
      navigate('/profile-setup');
    } catch (error) {
      setErrors({ email: error.response?.data?.message || 'Registration failed' });
    }
  } else {
    setErrors(newErrors);
  }
};
```

### 7. Update Results Component

Update `src/pages/Results.jsx`:

```javascript
import { useEffect, useState } from 'react';
import { getRecommendations } from '../services/api';

const Results = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Get user skills from localStorage or state
        const userSkills = ['JavaScript', 'React', 'Python']; // Example
        const data = await getRecommendations(userSkills);
        setRecommendations(data.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    // Your existing JSX with recommendations data
  );
};
```

## Testing Full Stack

### 1. Test Registration
1. Open frontend: http://localhost:5173
2. Go to Signup page
3. Fill form and submit
4. Check browser console for success
5. Check MongoDB for new user

### 2. Test Login
1. Go to Login page
2. Enter registered credentials
3. Check console for user data
4. Verify redirect to dashboard

### 3. Test Career Recommendations
1. Complete profile setup with skills
2. Take assessment
3. View results page
4. Check if recommendations load from backend

## Verification Commands

### Check Backend
```bash
# Test API directly
curl http://localhost:5000
curl http://localhost:5000/api/careers
```

### Check MongoDB
```bash
# Open MongoDB shell
mongosh

# Use database
use career-advisor

# Check users
db.users.find()

# Check careers
db.careers.find()
```

## Common Integration Issues

### CORS Error
**Problem**: Frontend can't connect to backend

**Solution**: Verify CORS in `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Network Error
**Problem**: axios.post fails

**Solution**: 
1. Check backend is running
2. Check URL is correct
3. Check request body format

### 401 Unauthorized
**Problem**: Login fails

**Solution**:
1. Check email/password are correct
2. Check user exists in database
3. Check password hashing works

## Project Structure

```
FSD project/
├── career-advisor-backend/     # Backend API
│   ├── server.js              # Running on :5000
│   └── ...
└── career-advisor-vite/       # Frontend
    ├── src/
    │   ├── services/
    │   │   └── api.js         # API calls
    │   └── pages/
    │       ├── Login.jsx
    │       ├── Signup.jsx
    │       └── Results.jsx
    └── ...
```

## Running Both Servers

### Terminal 1 - Backend
```bash
cd "d:\Education Purpose\FSD project\career-advisor-backend"
npm run dev
```

### Terminal 2 - Frontend
```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-advisor
NODE_ENV=development
```

### Frontend (if needed)
Create `.env` in frontend:
```
VITE_API_URL=http://localhost:5000/api
```

Then use:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Database seeded with careers
- [ ] Axios installed in frontend
- [ ] API service created
- [ ] Login component updated
- [ ] Signup component updated
- [ ] Test registration works
- [ ] Test login works
- [ ] Test career recommendations work
- [ ] No CORS errors
- [ ] Data flows between frontend and backend

## Next Steps

1. Add loading states in frontend
2. Add error handling UI
3. Store user data in context/state
4. Add protected routes
5. Add logout functionality
6. Add profile update feature
7. Add assessment results storage

---

**Full Stack Integration Complete! 🎉**

Both frontend and backend are connected and working together!
