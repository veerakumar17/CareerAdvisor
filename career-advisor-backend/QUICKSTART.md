# 🚀 Quick Start Guide

## Prerequisites
- ✅ Node.js installed
- ✅ MongoDB installed and running

## Setup (5 Steps)

### 1. Install Dependencies
```bash
cd "d:\Education Purpose\FSD project\career-advisor-backend"
npm install
```

### 2. Start MongoDB
```bash
# Windows - MongoDB runs as service automatically
# Or check: net start MongoDB
```

### 3. Seed Database
```bash
node utils/seedCareers.js
```

### 4. Start Server
```bash
npm run dev
```

### 5. Test API
Open browser: http://localhost:5000

## API Endpoints

- **Register**: POST http://localhost:5000/api/auth/register
- **Login**: POST http://localhost:5000/api/auth/login
- **Careers**: GET http://localhost:5000/api/careers
- **Recommend**: POST http://localhost:5000/api/recommend

## Test with Postman

### Register User
```json
POST http://localhost:5000/api/auth/register

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Get Recommendations
```json
POST http://localhost:5000/api/recommend

{
  "skills": ["JavaScript", "React", "Python"]
}
```

## Troubleshooting

### MongoDB not running?
```bash
net start MongoDB
```

### Port 5000 in use?
Change PORT in `.env` file

---

**That's it! Your backend is running! 🎉**
