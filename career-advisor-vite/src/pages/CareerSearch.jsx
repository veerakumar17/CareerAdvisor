import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { careerAPI, userAPI } from '../services/api';
import './CareerSearch.css';

const CareerSearch = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [growthFilter, setGrowthFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedCareers, setSavedCareers] = useState([]);

  useEffect(() => {
    fetchCareers();
    fetchSavedCareers();
  }, [search, skillFilter, growthFilter, page]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 6,
        ...(search && { search }),
        ...(skillFilter && { skill: skillFilter }),
        ...(growthFilter && { growth: growthFilter })
      };
      
      const response = await careerAPI.getAll(params);
      setCareers(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedCareers = async () => {
    try {
      const response = await userAPI.getSavedCareers();
      setSavedCareers(response.data.data.map(c => c._id));
    } catch (error) {
      console.log('Not logged in or error fetching saved careers');
    }
  };

  const handleSaveCareer = async (careerId) => {
    try {
      if (savedCareers.includes(careerId)) {
        await userAPI.unsaveCareer(careerId);
        setSavedCareers(savedCareers.filter(id => id !== careerId));
      } else {
        await userAPI.saveCareer(careerId);
        setSavedCareers([...savedCareers, careerId]);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Please login to save careers');
    }
  };

  const handleReset = () => {
    setSearch('');
    setSkillFilter('');
    setGrowthFilter('');
    setPage(1);
  };

  return (
    <div className="career-search-page">
      <div className="container">
        <h1>Explore Careers</h1>
        
        <div className="search-filters card">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search careers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)}>
              <option value="">All Skills</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Machine Learning">Machine Learning</option>
            </select>
            
            <select value={growthFilter} onChange={(e) => setGrowthFilter(e.target.value)}>
              <option value="">All Growth Rates</option>
              <option value="High">High (20%+)</option>
              <option value="Medium">Medium (10-20%)</option>
              <option value="Low">Low (&lt;10%)</option>
            </select>
            
            <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading careers...</div>
        ) : (
          <>
            <div className="careers-grid">
              {careers.map(career => (
                <div key={career._id} className="career-card card">
                  <h3>{career.title}</h3>
                  <p>{career.description}</p>
                  
                  <div className="career-info">
                    <div className="info-item">
                      <span>💰</span> {career.averageSalary}
                    </div>
                    <div className="info-item">
                      <span>📈</span> {career.growthRate}
                    </div>
                  </div>
                  
                  <div className="skills-preview">
                    {career.requiredSkills?.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                    {career.requiredSkills?.length > 3 && (
                      <span className="skill-tag">+{career.requiredSkills.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="card-actions">
                    <Link to={`/career/${career._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button
                      className={`btn ${savedCareers.includes(career._id) ? 'btn-saved' : 'btn-secondary'}`}
                      onClick={() => handleSaveCareer(career._id)}
                    >
                      {savedCareers.includes(career._id) ? '❤️ Saved' : '🤍 Save'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  className="btn btn-secondary"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CareerSearch;
