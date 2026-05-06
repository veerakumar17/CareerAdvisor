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
import CareerSearch from './pages/CareerSearch';
import Chatbot from './components/common/Chatbot';
import ProtectedRoute from './components/auth/ProtectedRoute';


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
          <Route path="/careers" element={<CareerSearch />} />
          <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><CareerAssessment /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/skill-gap" element={<ProtectedRoute><SkillGapAnalyzer /></ProtectedRoute>} />
          <Route path="/career/:id" element={<ProtectedRoute><CareerDetail /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><CareerComparison /></ProtectedRoute>} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
