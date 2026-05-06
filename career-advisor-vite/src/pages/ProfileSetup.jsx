import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetup.css';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    subjects: {},
    interests: []
  });

  const skillsList = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'C++', 'Data Analysis', 'Machine Learning'];
  const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English'];
  const interestsList = [
    { name: 'Technology', icon: '💻' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Business', icon: '💼' },
    { name: 'Arts', icon: '🎨' },
    { name: 'Science', icon: '🔬' },
    { name: 'Education', icon: '📚' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('profileSetup');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('profileSetup', JSON.stringify(formData));
  }, [formData]);

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const updateSubjectRating = (subject, rating) => {
    setFormData(prev => ({
      ...prev,
      subjects: { ...prev.subjects, [subject]: rating }
    }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      console.log('Profile setup complete', formData);
      navigate('/assessment');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="profile-setup">
      <div className="container">
        <div className="setup-card card">
          <div className="progress-bar">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`progress-step ${step >= s ? 'active' : ''}`}>
                <div className="step-circle">{s}</div>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="step-content">
              <h2>Education Level</h2>
              <div className="input-group">
                <select value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })}>
                  <option value="">Select your education level</option>
                  <option value="high-school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Select Your Skills</h2>
              <div className="tags-container">
                {skillsList.map(skill => (
                  <button
                    key={skill}
                    className={`tag ${formData.skills.includes(skill) ? 'active' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>Rate Your Subject Strength</h2>
              {subjectsList.map(subject => (
                <div key={subject} className="subject-rating">
                  <label>{subject}</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`star ${(formData.subjects[subject] || 0) >= star ? 'filled' : ''}`}
                        onClick={() => updateSubjectRating(subject, star)}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h2>Select Your Interests</h2>
              <div className="interests-grid">
                {interestsList.map(interest => (
                  <div
                    key={interest.name}
                    className={`interest-card ${formData.interests.includes(interest.name) ? 'active' : ''}`}
                    onClick={() => toggleInterest(interest.name)}
                  >
                    <div className="interest-icon">{interest.icon}</div>
                    <div className="interest-name">{interest.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="step-actions">
            {step > 1 && <button className="btn btn-secondary" onClick={handleBack}>Back</button>}
            <button className="btn btn-primary" onClick={handleNext}>
              {step === 4 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
