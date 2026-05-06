import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CareerDetail.css';

const CareerDetail = () => {
  const { id } = useParams();

  const careerData = {
    title: 'Software Engineer',
    icon: '💻',
    description: 'Software engineers design, develop, test, and maintain software applications and systems. They work with various programming languages and frameworks to create solutions for businesses and users.',
    salary: '$80,000 - $150,000',
    growth: '22% (Much faster than average)',
    workType: 'Remote/Hybrid/Office',
    requiredSkills: [
      'Programming Languages (Java, Python, JavaScript)',
      'Data Structures & Algorithms',
      'Version Control (Git)',
      'Database Management',
      'Problem Solving',
      'Team Collaboration'
    ],
    educationPath: [
      'Bachelor\'s degree in Computer Science or related field',
      'Master\'s degree (Optional)',
      'Coding bootcamps (Alternative)',
      'Online certifications'
    ],
    roadmap: [
      {
        year: 'Year 1',
        title: 'Foundation',
        tasks: [
          'Learn programming fundamentals',
          'Master data structures & algorithms',
          'Build small projects',
          'Learn Git and GitHub'
        ]
      },
      {
        year: 'Year 2',
        title: 'Intermediate',
        tasks: [
          'Learn web development frameworks',
          'Build full-stack applications',
          'Contribute to open source',
          'Complete internships'
        ]
      },
      {
        year: 'Year 3',
        title: 'Advanced',
        tasks: [
          'Master system design',
          'Learn cloud technologies',
          'Build portfolio projects',
          'Prepare for interviews'
        ]
      },
      {
        year: 'Year 4',
        title: 'Professional',
        tasks: [
          'Apply for jobs',
          'Network with professionals',
          'Continue learning new technologies',
          'Mentor junior developers'
        ]
      }
    ]
  };

  return (
    <div className="career-detail-page">
      <div className="container">
        <div className="career-header">
          <div className="career-icon-large">{careerData.icon}</div>
          <h1>{careerData.title}</h1>
          <p>{careerData.description}</p>
        </div>

        <div className="career-stats">
          <div className="stat-card card">
            <div className="stat-icon">💰</div>
            <div className="stat-label">Salary Range</div>
            <div className="stat-value">{careerData.salary}</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">📈</div>
            <div className="stat-label">Job Growth</div>
            <div className="stat-value">{careerData.growth}</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">🏢</div>
            <div className="stat-label">Work Type</div>
            <div className="stat-value">{careerData.workType}</div>
          </div>
        </div>

        <div className="career-content">
          <div className="content-section card">
            <h3>Required Skills</h3>
            <div className="skills-grid">
              {careerData.requiredSkills.map((skill, idx) => (
                <div key={idx} className="skill-badge">
                  <span className="badge-icon">✓</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="content-section card">
            <h3>Education Path</h3>
            <ul className="education-list">
              {careerData.educationPath.map((path, idx) => (
                <li key={idx}>{path}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="roadmap-section card">
          <h2>Career Roadmap</h2>
          <div className="timeline">
            {careerData.roadmap.map((phase, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{phase.year}</div>
                  <h4>{phase.title}</h4>
                  <ul>
                    {phase.tasks.map((task, taskIdx) => (
                      <li key={taskIdx}>{task}</li>
                    ))}
                  </ul>
                </div>
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
