# API Usage Examples for Other Components

## Results.jsx - Fetch Recommendations

```javascript
import React, { useState, useEffect } from 'react';
import { recommendAPI } from '../services/api';

const Results = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const skills = user?.skills || [];
        
        const response = await recommendAPI.getRecommendations({ skills });
        setRecommendations(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {recommendations.map((rec, idx) => (
        <div key={idx}>
          <h3>{rec.career.title}</h3>
          <p>Match: {rec.matchPercentage}%</p>
        </div>
      ))}
    </div>
  );
};
```

## CareerDetail.jsx - Fetch Single Career

```javascript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { careerAPI } from '../services/api';

const CareerDetail = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await careerAPI.getById(id);
        setCareer(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!career) return <div>Career not found</div>;

  return (
    <div>
      <h1>{career.title}</h1>
      <p>{career.description}</p>
      <p>Salary: {career.averageSalary}</p>
      <p>Growth: {career.growthRate}</p>
    </div>
  );
};
```

## CareerComparison.jsx - Fetch Multiple Careers

```javascript
import React, { useState, useEffect } from 'react';
import { careerAPI } from '../services/api';

const CareerComparison = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careerAPI.getAll();
        setCareers(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return (
    <div>
      <select>
        {careers.map(career => (
          <option key={career._id} value={career._id}>
            {career.title}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## ProfileSetup.jsx - Update User Profile

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skills: [],
    interests: [],
    education: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Update user in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    navigate('/assessment');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Complete</button>
    </form>
  );
};
```

## Protected Route Component

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

### Usage in App.jsx
```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## Error Handling Utility

```javascript
// src/utils/errorHandler.js
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred';
  }
};

// Usage
import { handleAPIError } from '../utils/errorHandler';

try {
  await authAPI.login(data);
} catch (error) {
  const message = handleAPIError(error);
  setErrors({ email: message });
}
```

## Loading Component

```javascript
// src/components/Loading.jsx
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh' 
  }}>
    <div>Loading...</div>
  </div>
);

export default Loading;
```

## User Context (Optional - Advanced)

```javascript
// src/context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Usage in App.jsx
import { UserProvider } from './context/UserContext';

<UserProvider>
  <Router>
    {/* Routes */}
  </Router>
</UserProvider>

// Usage in components
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## API Response Structure

### Success Response
```javascript
{
  success: true,
  message: "Operation successful",
  data: { /* response data */ },
  token: "jwt_token_here" // for auth endpoints
}
```

### Error Response
```javascript
{
  success: false,
  message: "Error message here"
}
```

## Complete Example: Assessment Results

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendAPI } from '../services/api';
import Loading from '../components/Loading';

const Results = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check authentication
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/login');
          return;
        }

        // Get recommendations
        if (user.skills && user.skills.length > 0) {
          const response = await recommendAPI.getRecommendations({ 
            skills: user.skills 
          });
          setRecommendations(response.data.data);
        } else {
          setError('Please complete your profile first');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="results-page">
      <h1>Your Career Recommendations</h1>
      {recommendations.map((rec, idx) => (
        <div key={idx} className="recommendation-card">
          <h3>{rec.career.title}</h3>
          <p>{rec.career.description}</p>
          <div className="match-score">
            Match: {rec.matchPercentage}%
          </div>
          <div className="skills">
            <h4>Matching Skills:</h4>
            {rec.matchingSkills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
          <div className="missing-skills">
            <h4>Skills to Learn:</h4>
            {rec.missingSkills.map((skill, i) => (
              <span key={i} className="skill-tag missing">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
```

---

**Use these examples to integrate API calls in your remaining components!**
