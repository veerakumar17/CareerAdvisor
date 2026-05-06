import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { careerAPI, recommendAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [topCareers, setTopCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserProfile(user);

    // Fetch career recommendations
    const fetchRecommendations = async () => {
      try {
        if (user.skills && user.skills.length > 0) {
          const response = await recommendAPI.getRecommendations({ skills: user.skills });
          const recommendations = response.data.data.slice(0, 3).map(rec => ({
            name: rec.career.title,
            match: rec.matchPercentage,
            icon: '💼'
          }));
          setTopCareers(recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-page"><div className="container">Loading...</div></div>;
  }

  if (!userProfile) {
    return null;
  }

  const skillGaps = [
    { skill: 'Machine Learning', status: 'missing' },
    { skill: 'Cloud Computing', status: 'missing' },
    { skill: 'Docker', status: 'missing' }
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {userProfile.name}! 👋</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/profile-setup" className="btn btn-primary">Edit Profile</Link>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="profile-card card">
            <h3>Profile Summary</h3>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{userProfile.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{userProfile.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Education:</span>
                <span className="info-value">{userProfile.education || 'Not set'}</span>
              </div>
            </div>
            <div className="skills-section">
              <h4>Your Skills</h4>
              <div className="skills-tags">
                {userProfile.skills && userProfile.skills.length > 0 ? (
                  userProfile.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))
                ) : (
                  <p>No skills added yet</p>
                )}
              </div>
            </div>
            <div className="skills-section">
              <h4>Your Interests</h4>
              <div className="skills-tags">
                {userProfile.interests && userProfile.interests.length > 0 ? (
                  userProfile.interests.map((interest, idx) => (
                    <span key={idx} className="skill-tag">{interest}</span>
                  ))
                ) : (
                  <p>No interests added yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="careers-card card">
            <h3>Top Career Matches</h3>
            <div className="careers-list">
              {topCareers.length > 0 ? (
                topCareers.map((career, idx) => (
                  <div key={idx} className="career-item">
                    <div className="career-info">
                      <span className="career-icon">{career.icon}</span>
                      <span className="career-name">{career.name}</span>
                    </div>
                    <div className="career-match">{career.match}%</div>
                  </div>
                ))
              ) : (
                <p>Complete your profile to get recommendations</p>
              )}
            </div>
            <Link to="/results" className="btn btn-secondary full-width">View All</Link>
          </div>

          <div className="skill-gap-card card">
            <h3>Skill Gap Analysis</h3>
            <div className="gaps-list">
              {skillGaps.map((gap, idx) => (
                <div key={idx} className="gap-item">
                  <span className="gap-icon">❌</span>
                  <span className="gap-skill">{gap.skill}</span>
                </div>
              ))}
            </div>
            <Link to="/skill-gap" className="btn btn-secondary full-width">Analyze Skills</Link>
          </div>

          <div className="progress-card card">
            <h3>Your Progress</h3>
            <div className="progress-item">
              <div className="progress-label">Profile Completion</div>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-fill" style={{ width: '80%' }}></div>
              </div>
              <div className="progress-value">80%</div>
            </div>
            <div className="progress-item">
              <div className="progress-label">Skills Development</div>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-fill" style={{ width: '60%' }}></div>
              </div>
              <div className="progress-value">60%</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <Link to="/assessment" className="action-card card">
            <div className="action-icon">📝</div>
            <h4>Take Assessment</h4>
            <p>Discover new career paths</p>
          </Link>
          <Link to="/compare" className="action-card card">
            <div className="action-icon">⚖️</div>
            <h4>Compare Careers</h4>
            <p>Side-by-side comparison</p>
          </Link>
          <Link to="/skill-gap" className="action-card card">
            <div className="action-icon">📈</div>
            <h4>Skill Analysis</h4>
            <p>Identify gaps & improve</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
