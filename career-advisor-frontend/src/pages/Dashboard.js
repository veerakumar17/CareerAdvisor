import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const userProfile = {
    name: 'John Doe',
    education: 'Undergraduate',
    skills: ['JavaScript', 'Python', 'React', 'Node.js'],
    completedAssessments: 1
  };

  const topCareers = [
    { name: 'Software Engineer', match: 92, icon: '💻' },
    { name: 'Data Scientist', match: 85, icon: '📊' },
    { name: 'UX/UI Designer', match: 78, icon: '🎨' }
  ];

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
          <Link to="/profile-setup" className="btn btn-primary">Edit Profile</Link>
        </div>

        <div className="dashboard-grid">
          <div className="profile-card card">
            <h3>Profile Summary</h3>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Education:</span>
                <span className="info-value">{userProfile.education}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Assessments:</span>
                <span className="info-value">{userProfile.completedAssessments}</span>
              </div>
            </div>
            <div className="skills-section">
              <h4>Your Skills</h4>
              <div className="skills-tags">
                {userProfile.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="careers-card card">
            <h3>Top Career Matches</h3>
            <div className="careers-list">
              {topCareers.map((career, idx) => (
                <div key={idx} className="career-item">
                  <div className="career-info">
                    <span className="career-icon">{career.icon}</span>
                    <span className="career-name">{career.name}</span>
                  </div>
                  <div className="career-match">{career.match}%</div>
                </div>
              ))}
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
