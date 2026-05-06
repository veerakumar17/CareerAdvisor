import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    { icon: '🎯', title: 'Career Assessment', desc: 'AI-powered questionnaire to find your perfect career match' },
    { icon: '📊', title: 'Skill Analysis', desc: 'Identify skill gaps and get personalized learning paths' },
    { icon: '🚀', title: 'Career Roadmap', desc: 'Step-by-step guidance to achieve your career goals' },
    { icon: '💼', title: 'Job Insights', desc: 'Salary trends, growth prospects, and market demand' },
    { icon: '🤝', title: 'Career Comparison', desc: 'Compare multiple careers side-by-side' },
    { icon: '🤖', title: 'AI Chatbot', desc: '24/7 career guidance and instant answers' }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-Based Career & <span className="gradient-text">Education Advisor</span>
            </h1>
            <p className="hero-subtitle">
              Discover your perfect career path with AI-powered insights, personalized recommendations, 
              and comprehensive skill gap analysis.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/assessment" className="btn btn-secondary">Take Assessment</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">🎓</div>
            <div className="floating-card">💡</div>
            <div className="floating-card">🚀</div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Find Your Dream Career?</h2>
          <p>Join thousands of students who found their perfect career path</p>
          <Link to="/signup" className="btn btn-primary">Start Your Journey</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
