import React from 'react';
import { Link } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const recommendations = [
    {
      id: 1,
      title: 'Software Engineer',
      match: 92,
      icon: '💻',
      description: 'Design, develop, and maintain software applications',
      reasons: [
        'Strong problem-solving skills',
        'Interest in technology and coding',
        'Analytical thinking ability',
        'Team collaboration preference'
      ]
    },
    {
      id: 2,
      title: 'Data Scientist',
      match: 85,
      icon: '📊',
      description: 'Analyze complex data to help companies make decisions',
      reasons: [
        'Strong mathematical background',
        'Interest in data analysis',
        'Research-oriented mindset',
        'Statistical knowledge'
      ]
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      match: 78,
      icon: '🎨',
      description: 'Create user-friendly and visually appealing interfaces',
      reasons: [
        'Creative thinking',
        'User-centric approach',
        'Design skills',
        'Problem-solving ability'
      ]
    }
  ];

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header">
          <h1>Your Career Recommendations</h1>
          <p>Based on your assessment, here are the top careers that match your profile</p>
        </div>

        <div className="recommendations-grid">
          {recommendations.map((career, index) => (
            <div key={career.id} className="recommendation-card card">
              <div className="rank-badge">#{index + 1}</div>
              <div className="career-icon">{career.icon}</div>
              <h3>{career.title}</h3>
              <p className="career-desc">{career.description}</p>

              <div className="match-section">
                <div className="match-label">Match Score</div>
                <div className="match-bar-container">
                  <div className="match-bar" style={{ width: `${career.match}%` }}>
                    <span className="match-percentage">{career.match}%</span>
                  </div>
                </div>
              </div>

              <div className="reasons-section">
                <h4>Why this career?</h4>
                <ul>
                  {career.reasons.map((reason, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={`/career/${career.id}`} className="btn btn-primary full-width">
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
