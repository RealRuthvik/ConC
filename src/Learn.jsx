import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Learn.css';

function Learn() {
  const { userData, logout, currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="learn-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.5rem', fontWeight: '800' }}>
            CONC<span style={{ color: '#00a8ff' }}>.</span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📚</span>
            Learn
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">🎯</span>
            Quests
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📝</span>
            Assignments
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">🏆</span>
            Challenges
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-right">
            <div className={`status-badge ${userData?.status?.toLowerCase()}`}>
              {userData?.status || 'Free'}
            </div>
            <button onClick={logout} className="logout-btn">Log out</button>
          </div>
        </header>

        {/* Content Space */}
        <div className="content-area">
          {userData?.status === 'Premium' ? (
            <div className="premium-content">
              <h2>Welcome to The Better Man Bootcamp</h2>
              <p>You have full access to all fundamentals, IRL side quests, and the private community.</p>
              {/* Premium content will go here */}
            </div>
          ) : (
            <div className="free-content">
              <h2>Welcome to the Free Tier</h2>
              <p>You have access to selected Grooming, Physique, and Social material.</p>
              <div className="upgrade-prompt">
                <h3>Want the full experience?</h3>
                <Link to="/" className="upgrade-btn">Upgrade to Bootcamp</Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Learn;
