import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Learn.css';

function DashboardLayout() {
  const { userData, currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="learn-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo" style={{ marginBottom: '3rem' }}>
          <Link to="/learn" style={{
            textDecoration: 'none',
            color: '#fff',
            fontSize: '2.1rem',
            fontWeight: '800',
            display: 'block',
            letterSpacing: '-0.02em'
          }}>
            The Better Man Bootcamp.
          </Link>
        </div>
        <nav className="sidebar-nav">
          <Link to="/learn" className={`nav-item ${location.pathname === '/learn' ? 'active' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Learn
          </Link>
          <a href="#" className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Assignments
          </a>
          {userData?.status === 'P' && (
            <>
              <a href="#" className="nav-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                Quests
              </a>
              <a href="#" className="nav-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z"></path></svg>
                Challenges
              </a>
              <a href="#" className="nav-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Community
              </a>
            </>
          )}
          <a href="#" className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Inbox
          </a>
          <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-2.82.33 1.65 1.65 0 0 0-.1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-2.82 1.65 1.65 0 0 0-1.51-.1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 2.82-.33 1.65 1.65 0 0 0 .1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 2.82 1.65 1.65 0 0 0 1.51.1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </Link>
        </nav>

        {userData?.status !== 'P' && (
          <div style={{
            marginTop: 'auto',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.03)'
          }}>
            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderRadius: '50%', borderTopColor: 'transparent', transform: 'rotate(45deg)' }}></div>
            </div>
            <p style={{ 
              fontSize: '0.95rem', 
              fontWeight: '500', 
              lineHeight: '1.4', 
              marginBottom: '1.25rem',
              color: '#d1d1d1',
              letterSpacing: '0.01em'
            }}>
              Get the full experience.<br/>Upgrade to Bootcamp.
            </p>
            <Link to="/" style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontSize: '0.95rem', 
              fontWeight: '700',
              borderBottom: '2px solid #fff',
              paddingBottom: '2px'
            }}>
              Upgrade
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-right">
            <div className={`status-badge ${userData?.status === 'P' ? 'premium' : 'free'}`}>
              {userData?.status === 'P' ? 'Premium' : 'Free'}
            </div>
          </div>
        </header>

        {/* Content Space */}
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
