import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CareerAssessment.css';

const CareerAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: 'What type of work environment do you prefer?',
      options: ['Office-based', 'Remote/Flexible', 'Outdoor', 'Laboratory/Research']
    },
    {
      id: 2,
      question: 'Which activity interests you the most?',
      options: ['Problem Solving', 'Creative Design', 'Helping Others', 'Data Analysis']
    },
    {
      id: 3,
      question: 'What is your preferred work style?',
      options: ['Independent', 'Team Collaboration', 'Leadership', 'Mentoring']
    },
    {
      id: 4,
      question: 'Which skill do you want to develop?',
      options: ['Technical Skills', 'Communication', 'Management', 'Research']
    },
    {
      id: 5,
      question: 'What motivates you the most?',
      options: ['High Salary', 'Job Satisfaction', 'Work-Life Balance', 'Career Growth']
    }
  ];

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('Assessment complete', answers);
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="assessment-page">
      <div className="container">
        <div className="assessment-card card">
          <div className="assessment-header">
            <h2>Career Assessment</h2>
            <p>Question {currentQuestion + 1} of {questions.length}</p>
          </div>

          <div className="progress-container">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="question-container">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`option-card ${answers[currentQuestion] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(option)}
                >
                  <div className="option-radio">
                    {answers[currentQuestion] === option && <div className="radio-dot"></div>}
                  </div>
                  <div className="option-text">{option}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="assessment-actions">
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;
