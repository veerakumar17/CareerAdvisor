# AI Career Advisor - Backend API

## 🚀 Complete Backend Setup

### Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (password hashing)
- CORS
- dotenv

## 📁 Project Structure

```
career-advisor-backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Auth logic
│   ├── careerController.js      # Career CRUD
│   └── recommendationController.js  # AI matching
├── models/
│   ├── User.js                  # User schema
│   └── Career.js                # Career schema
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── careerRoutes.js          # Career endpoints
│   └── recommendationRoutes.js  # Recommendation endpoint
├── middleware/
│   └── errorMiddleware.js       # Error handling
├── utils/
│   └── seedCareers.js           # Seed database
├── .env                         # Environment variables
├── .gitignore
├── server.js                    # Entry point
└── package.json
```

## 🔧 Installation

### 1. Install MongoDB
Download and install MongoDB Community Server:
https://www.mongodb.com/try/download/community

### 2. Start MongoDB
```bash
# Windows - Run as Service (automatic)
# Or manually:
mongod
```

### 3. Install Dependencies
```bash
cd "d:\Education Purpose\FSD project\career-advisor-backend"
npm install
```

### 4. Configure Environment
`.env` file is already created with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-advisor
NODE_ENV=development
```

### 5. Seed Database
```bash
node utils/seedCareers.js
```

### 6. Start Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:5000**

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "skills": [],
    "interests": [],
    "education": "undergraduate"
  }
}
```

### Careers

#### Get All Careers
```http
GET /api/careers
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "title": "Software Engineer",
      "description": "...",
      "requiredSkills": ["JavaScript", "React", "Node.js"],
      "averageSalary": "$80,000 - $150,000",
      "growthRate": "22%"
    }
  ]
}
```

#### Get Career by ID
```http
GET /api/careers/:id
```

### Recommendations

#### Get Career Recommendations
```http
POST /api/recommend
Content-Type: application/json

{
  "skills": ["JavaScript", "React", "Python"]
}
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "career": {
        "id": "...",
        "title": "Software Engineer",
        "description": "...",
        "requiredSkills": ["JavaScript", "React", "Node.js"],
        "averageSalary": "$80,000 - $150,000",
        "growthRate": "22%"
      },
      "matchPercentage": 85,
      "matchingSkills": ["JavaScript", "React"],
      "missingSkills": ["Node.js"]
    }
  ]
}
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ CORS configured for frontend (localhost:5173)
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Environment variables

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  skills: [String],
  interests: [String],
  education: String,
  createdAt: Date
}
```

### Career Model
```javascript
{
  title: String,
  description: String,
  requiredSkills: [String],
  averageSalary: String,
  growthRate: String,
  workType: String,
  education: String,
  createdAt: Date
}
```

## 🧪 Testing with Postman/Thunder Client

### 1. Register User
- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body: JSON with name, email, password

### 2. Login User
- Method: POST
- URL: http://localhost:5000/api/auth/login
- Body: JSON with email, password

### 3. Get Careers
- Method: GET
- URL: http://localhost:5000/api/careers

### 4. Get Recommendations
- Method: POST
- URL: http://localhost:5000/api/recommend
- Body: JSON with skills array

## 🔄 Connecting Frontend

In your React app, use Axios:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Login
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Get Careers
const getCareers = async () => {
  const response = await axios.get(`${API_URL}/careers`);
  return response.data;
};

// Get Recommendations
const getRecommendations = async (skills) => {
  const response = await axios.post(`${API_URL}/recommend`, { skills });
  return response.data;
};
```

## 📝 Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with sample careers
node utils/seedCareers.js
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
net start MongoDB
```

### Port Already in Use
Change PORT in `.env` file:
```
PORT=5001
```

### CORS Error
Verify frontend URL in `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

## 🚀 Production Deployment

### Environment Variables
Update `.env` for production:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-advisor
NODE_ENV=production
```

### Deploy to Heroku/Railway/Render
1. Push code to GitHub
2. Connect repository
3. Add environment variables
4. Deploy

## ✅ Features Implemented

- [x] User registration with password hashing
- [x] User login with password verification
- [x] Career CRUD operations
- [x] AI-based career recommendations
- [x] Skill matching algorithm
- [x] Error handling middleware
- [x] CORS configuration
- [x] MongoDB connection
- [x] ES Module syntax
- [x] Professional folder structure

## 📚 Next Steps

1. Add JWT authentication
2. Add user profile update endpoint
3. Add assessment results storage
4. Add more career data
5. Implement caching
6. Add rate limiting
7. Add API documentation (Swagger)

---

**Backend is ready! Start the server and connect your frontend! 🎉**
