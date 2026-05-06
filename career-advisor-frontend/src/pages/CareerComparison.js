import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CareerComparison.css';

const CareerComparison = () => {
  const [career1, setCareer1] = useState('Software Engineer');
  const [career2, setCareer2] = useState('Data Scientist');

  const careersData = {
    'Software Engineer': {
      icon: '💻',
      salary: '$80,000 - $150,000',
      growth: '22%',
      education: 'Bachelor\'s in CS',
      workType: 'Remote/Hybrid',
      skills: ['JavaScript', 'React', 'Node.js', 'Git', 'AWS'],
      difficulty: 'Medium',
      timeToLearn: '2-3 years'
    },
    'Data Scientist': {
      icon: '📊',
      salary: '$90,000 - $160,000',
      growth: '31%',
      education: 'Bachelor\'s/Master\'s in Data Science',
      workType: 'Hybrid/Office',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow'],
      difficulty: 'Hard',
      timeToLearn: '3-4 years'
    },
    'UX/UI Designer': {
      icon: '🎨',
      salary: '$60,000 - $120,000',
      growth: '13%',
      education: 'Bachelor\'s in Design',
      workType: 'Remote/Hybrid',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'HTML/CSS'],
      difficulty: 'Medium',
      timeToLearn: '1-2 years'
    },
    'Product Manager': {
      icon: '💼',
      salary: '$100,000 - $180,000',
      growth: '18%',
      education: 'Bachelor\'s/MBA',
      workType: 'Hybrid/Office',
      skills: ['Strategy', 'Communication', 'Analytics', 'Leadership', 'Agile'],
      difficulty: 'Hard',
      timeToLearn: '3-5 years'
    }
  };

  const careerOptions = Object.keys(careersData);
  const data1 = careersData[career1];
  const data2 = careersData[career2];

  return (
    <div className="comparison-page">
      <div className="container">
        <h1>Career Comparison</h1>
        <p className="page-subtitle">Compare two careers side-by-side to make an informed decision</p>

        <div className="career-selectors">
          <div className="selector-group">
            <label>Career 1</label>
            <select value={career1} onChange={(e) => setCareer1(e.target.value)}>
              {careerOptions.map(career => (
                <option key={career} value={career}>{career}</option>
              ))}
            </select>
          </div>
          <div className="vs-divider">VS</div>
          <div className="selector-group">
            <label>Career 2</label>
            <select value={career2} onChange={(e) => setCareer2(e.target.value)}>
              {careerOptions.map(career => (
                <option key={career} value={career}>{career}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card card">
            <div className="career-header-comp">
              <div className="career-icon-comp">{data1.icon}</div>
              <h3>{career1}</h3>
            </div>

            <div className="comparison-details">
              <div className="detail-item">
                <div className="detail-label">💰 Salary Range</div>
                <div className="detail-value">{data1.salary}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">📈 Job Growth</div>
                <div className="detail-value">{data1.growth}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">🎓 Education</div>
                <div className="detail-value">{data1.education}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">🏢 Work Type</div>
                <div className="detail-value">{data1.workType}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">⚡ Difficulty</div>
                <div className="detail-value">{data1.difficulty}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">⏱️ Time to Learn</div>
                <div className="detail-value">{data1.timeToLearn}</div>
              </div>
            </div>

            <div className="skills-section-comp">
              <h4>Required Skills</h4>
              <div className="skills-tags-comp">
                {data1.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag-comp">{skill}</span>
                ))}
              </div>
            </div>

            <Link to={`/career/${career1}`} className="btn btn-primary full-width">
              View Details
            </Link>
          </div>

          <div className="comparison-card card">
            <div className="career-header-comp">
              <div className="career-icon-comp">{data2.icon}</div>
              <h3>{career2}</h3>
            </div>

            <div className="comparison-details">
              <div className="detail-item">
                <div className="detail-label">💰 Salary Range</div>
                <div className="detail-value">{data2.salary}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">📈 Job Growth</div>
                <div className="detail-value">{data2.growth}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">🎓 Education</div>
                <div className="detail-value">{data2.education}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">🏢 Work Type</div>
                <div className="detail-value">{data2.workType}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">⚡ Difficulty</div>
                <div className="detail-value">{data2.difficulty}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">⏱️ Time to Learn</div>
                <div className="detail-value">{data2.timeToLearn}</div>
              </div>
            </div>

            <div className="skills-section-comp">
              <h4>Required Skills</h4>
              <div className="skills-tags-comp">
                {data2.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag-comp">{skill}</span>
                ))}
              </div>
            </div>

            <Link to={`/career/${career2}`} className="btn btn-primary full-width">
              View Details
            </Link>
          </div>
        </div>

        <div className="actions-section">
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default CareerComparison;
