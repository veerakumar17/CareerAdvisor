import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SkillGapAnalyzer.css';

const SkillGapAnalyzer = () => {
  const [selectedCareer, setSelectedCareer] = useState('Software Engineer');

  const careers = ['Software Engineer', 'Data Scientist', 'UX/UI Designer'];

  const skillsData = {
    'Software Engineer': {
      userSkills: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'Docker', 'AWS', 'TypeScript'],
      recommendations: [
        'Complete Node.js course on Udemy',
        'Learn Docker containerization',
        'Get AWS certification',
        'Practice TypeScript projects'
      ]
    },
    'Data Scientist': {
      userSkills: ['Python', 'SQL'],
      requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow', 'Data Visualization'],
      recommendations: [
        'Take Machine Learning course',
        'Study Statistics fundamentals',
        'Learn TensorFlow framework',
        'Master data visualization tools'
      ]
    },
    'UX/UI Designer': {
      userSkills: ['HTML/CSS', 'Figma'],
      requiredSkills: ['HTML/CSS', 'Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      recommendations: [
        'Learn Adobe XD',
        'Study user research methods',
        'Practice prototyping',
        'Understand design systems'
      ]
    }
  };

  const data = skillsData[selectedCareer];
  const missingSkills = data.requiredSkills.filter(skill => !data.userSkills.includes(skill));
  const matchPercentage = Math.round((data.userSkills.length / data.requiredSkills.length) * 100);

  return (
    <div className="skill-gap-page">
      <div className="container">
        <h1>Skill Gap Analysis</h1>
        <p className="page-subtitle">Identify missing skills and get personalized recommendations</p>

        <div className="career-selector">
          <label>Select Career:</label>
          <select value={selectedCareer} onChange={(e) => setSelectedCareer(e.target.value)}>
            {careers.map(career => (
              <option key={career} value={career}>{career}</option>
            ))}
          </select>
        </div>

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
                strokeDasharray={`${matchPercentage * 5.03} 503`}
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
            <div className="progress-text">{matchPercentage}%</div>
          </div>
          <p>{data.userSkills.length} of {data.requiredSkills.length} skills acquired</p>
        </div>

        <div className="skills-comparison">
          <div className="skills-section card">
            <h3>✅ Your Skills</h3>
            <div className="skills-list">
              {data.userSkills.map((skill, idx) => (
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
              {missingSkills.map((skill, idx) => (
                <div key={idx} className="skill-item missing-skill">
                  <span className="skill-icon">✗</span>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recommendations-section card">
          <h3>📚 Recommended Learning Path</h3>
          <div className="recommendations-list">
            {data.recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-item">
                <span className="rec-number">{idx + 1}</span>
                <span className="rec-text">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="actions-section">
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
          <Link to={`/career/${selectedCareer}`} className="btn btn-primary">View Career Details</Link>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
