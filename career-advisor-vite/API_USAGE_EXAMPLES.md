# API Usage Examples for Remaining Components

## Results.jsx - Fetch Career Recommendations

```javascript
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { recommendAPI } from '../services/api';
import './Results.css';

const Results = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/login');
          return;
        }

        const skills = user.skills || [];
        if (skills.length === 0) {
          navigate('/profile-setup');
          return;
        }

        const response = await recommendAPI.getRecommendations({ skills });
        setRecommendations(response.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [navigate]);

  if (loading) return <div>Loading recommendations...</div>;

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header">
          <h1>Your Career Recommendations</h1>
          <p>Based on your assessment, here are the top careers that match your profile</p>
        </div>

        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card card">
              <div className="rank-badge">#{index + 1}</div>
              <h3>{rec.career.title}</h3>
              <p className="career-desc">{rec.career.description}</p>

              <div className="match-section">
                <div className="match-label">Match Score</div>
                <div className="match-bar-container">
                  <div className="match-bar" style={{ width: `${rec.matchPercentage}%` }}>
                    <span className="match-percentage">{rec.matchPercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="reasons-section">
                <h4>Matching Skills</h4>
                <ul>
                  {rec.matchingSkills.map((skill, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={`/career/${rec.career.id}`} className="btn btn-primary full-width">
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <Link to="/skill-gap" className="btn btn-secondary">Analyze Skill Gaps</Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
```

## CareerDetail.jsx - Fetch Single Career

```javascript
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { careerAPI } from '../services/api';
import './CareerDetail.css';

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
        console.error('Error fetching career:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  if (loading) return <div>Loading career details...</div>;
  if (!career) return <div>Career not found</div>;

  return (
    <div className="career-detail-page">
      <div className="container">
        <div className="career-header">
          <h1>{career.title}</h1>
          <p>{career.description}</p>
        </div>

        <div className="career-stats">
          <div className="stat-card card">
            <div className="stat-icon">💰</div>
            <div className="stat-label">Salary Range</div>
            <div className="stat-value">{career.averageSalary}</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">📈</div>
            <div className="stat-label">Job Growth</div>
            <div className="stat-value">{career.growthRate}</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">🏢</div>
            <div className="stat-label">Work Type</div>
            <div className="stat-value">{career.workType}</div>
          </div>
        </div>

        <div className="content-section card">
          <h3>Required Skills</h3>
          <div className="skills-grid">
            {career.requiredSkills.map((skill, idx) => (
              <div key={idx} className="skill-badge">
                <span className="badge-icon">✓</span>
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="actions-section">
          <Link to="/skill-gap" className="btn btn-primary">Analyze Skill Gap</Link>
          <Link to="/compare" className="btn btn-secondary">Compare Careers</Link>
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
```

## CareerComparison.jsx - Fetch All Careers

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { careerAPI } from '../services/api';
import './CareerComparison.css';

const CareerComparison = () => {
  const [careers, setCareers] = useState([]);
  const [career1, setCareer1] = useState(null);
  const [career2, setCareer2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careerAPI.getAll();
        const careersList = response.data.data;
        setCareers(careersList);
        
        if (careersList.length >= 2) {
          setCareer1(careersList[0]);
          setCareer2(careersList[1]);
        }
      } catch (error) {
        console.error('Error fetching careers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  if (loading) return <div>Loading careers...</div>;

  return (
    <div className="comparison-page">
      <div className="container">
        <h1>Career Comparison</h1>
        <p className="page-subtitle">Compare two careers side-by-side to make an informed decision</p>

        <div className="career-selectors">
          <div className="selector-group">
            <label>Career 1</label>
            <select value={career1?._id} onChange={(e) => setCareer1(careers.find(c => c._id === e.target.value))}>
              {careers.map(career => (
                <option key={career._id} value={career._id}>{career.title}</option>
              ))}
            </select>
          </div>
          <div className="vs-divider">VS</div>
          <div className="selector-group">
            <label>Career 2</label>
            <select value={career2?._id} onChange={(e) => setCareer2(careers.find(c => c._id === e.target.value))}>
              {careers.map(career => (
                <option key={career._id} value={career._id}>{career.title}</option>
              ))}
            </select>
          </div>
        </div>

        {career1 && career2 && (
          <div className="comparison-grid">
            <div className="comparison-card card">
              <h3>{career1.title}</h3>
              <div className="comparison-details">
                <div className="detail-item">
                  <div className="detail-label">💰 Salary Range</div>
                  <div className="detail-value">{career1.averageSalary}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">📈 Job Growth</div>
                  <div className="detail-value">{career1.growthRate}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">🏢 Work Type</div>
                  <div className="detail-value">{career1.workType}</div>
                </div>
              </div>
              <Link to={`/career/${career1._id}`} className="btn btn-primary full-width">
                View Details
              </Link>
            </div>

            <div className="comparison-card card">
              <h3>{career2.title}</h3>
              <div className="comparison-details">
                <div className="detail-item">
                  <div className="detail-label">💰 Salary Range</div>
                  <div className="detail-value">{career2.averageSalary}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">📈 Job Growth</div>
                  <div className="detail-value">{career2.growthRate}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">🏢 Work Type</div>
                  <div className="detail-value">{career2.workType}</div>
                </div>
              </div>
              <Link to={`/career/${career2._id}`} className="btn btn-primary full-width">
                View Details
              </Link>
            </div>
          </div>
        )}

        <div className="actions-section">
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default CareerComparison;
```

## SkillGapAnalyzer.jsx - With API Integration

```javascript
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { careerAPI, recommendAPI } from '../services/api';
import './SkillGapAnalyzer.css';

const SkillGapAnalyzer = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/login');
          return;
        }

        setUserSkills(user.skills || []);

        const response = await careerAPI.getAll();
        const careersList = response.data.data;
        setCareers(careersList);
        
        if (careersList.length > 0) {
          analyzeSkillGap(careersList[0], user.skills || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const analyzeSkillGap = (career, skills) => {
    setSelectedCareer(career);
    
    const requiredSkills = career.requiredSkills || [];
    const matchingSkills = skills.filter(skill => 
      requiredSkills.some(req => 
        req.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(req.toLowerCase())
      )
    );
    const missingSkills = requiredSkills.filter(skill => !matchingSkills.includes(skill));
    const matchPercentage = requiredSkills.length > 0
      ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
      : 0;

    setAnalysis({ matchingSkills, missingSkills, matchPercentage });
  };

  const handleCareerChange = (e) => {
    const career = careers.find(c => c._id === e.target.value);
    if (career) {
      analyzeSkillGap(career, userSkills);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="skill-gap-page">
      <div className="container">
        <h1>Skill Gap Analysis</h1>
        <p className="page-subtitle">Identify missing skills and get personalized recommendations</p>

        <div className="career-selector">
          <label>Select Career:</label>
          <select value={selectedCareer?._id} onChange={handleCareerChange}>
            {careers.map(career => (
              <option key={career._id} value={career._id}>{career.title}</option>
            ))}
          </select>
        </div>

        {analysis && (
          <>
            <div className="match-overview card">
              <h3>Skill Match</h3>
              <div className="circular-progress">
                <svg width="200" height="200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border)" strokeWidth="20" />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeDasharray={`${analysis.matchPercentage * 5.03} 503`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-text">{analysis.matchPercentage}%</div>
              </div>
              <p>{analysis.matchingSkills.length} of {selectedCareer.requiredSkills.length} skills acquired</p>
            </div>

            <div className="skills-comparison">
              <div className="skills-section card">
                <h3>✅ Your Skills</h3>
                <div className="skills-list">
                  {analysis.matchingSkills.map((skill, idx) => (
                    <div key={idx} className="skill-item has-skill">
                      <span className="skill-icon">✓</span>
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skills-section card">
                <h3>❌ Missing Skills</h3>
                <div className="skills-list">
                  {analysis.missingSkills.map((skill, idx) => (
                    <div key={idx} className="skill-item missing-skill">
                      <span className="skill-icon">✗</span>
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="actions-section">
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
          <Link to={`/career/${selectedCareer?._id}`} className="btn btn-primary">View Career Details</Link>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
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

## Update App.jsx with Protected Routes

```javascript
import ProtectedRoute from './components/ProtectedRoute';

// Wrap protected routes
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
<Route path="/profile-setup" element={
  <ProtectedRoute>
    <ProfileSetup />
  </ProtectedRoute>
} />
<Route path="/assessment" element={
  <ProtectedRoute>
    <CareerAssessment />
  </ProtectedRoute>
} />
<Route path="/results" element={
  <ProtectedRoute>
    <Results />
  </ProtectedRoute>
} />
```

---

**Copy these examples to update your remaining components with API integration!**
