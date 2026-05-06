import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import CareerAssessment from './pages/CareerAssessment';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import SkillGapAnalyzer from './pages/SkillGapAnalyzer';
import CareerDetail from './pages/CareerDetail';
import CareerComparison from './pages/CareerComparison';
import Chatbot from './components/common/Chatbot';
import './styles/global.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/assessment" element={<CareerAssessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-gap" element={<SkillGapAnalyzer />} />
          <Route path="/career/:id" element={<CareerDetail />} />
          <Route path="/compare" element={<CareerComparison />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
