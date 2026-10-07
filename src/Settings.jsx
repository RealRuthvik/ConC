import React from 'react';
import { useAuth } from './AuthContext';

function Settings() {
  const { logout, userData, updateStatus, deleteAccount } = useAuth();
  
  const handleToggleStatus = () => {
    const newStatus = userData?.status === 'P' ? 'F' : 'P';
    updateStatus(newStatus);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (confirmDelete) {
      try {
        await deleteAccount();
      } catch (e) {
        alert("Error deleting account. You may need to log out and log back in to verify your identity.");
      }
    }
  };

  return (
    <div className="premium-content" style={{ textAlign: 'left', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '2rem' }}>Settings</h2>
      
      <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Account Information</h3>
        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>
          <strong style={{ color: '#fff' }}>Email:</strong> {userData?.email}
        </p>
        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#fff' }}>Status:</strong> {userData?.status === 'P' ? 'Premium' : 'Free'}
        </p>

        <button 
          onClick={handleToggleStatus}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          {userData?.status === 'P' ? 'Switch to Free (Test)' : 'Switch to Premium (Test)'}
        </button>
      </div>
      
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button 
          onClick={logout} 
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Log out
        </button>
        
        <button 
          onClick={handleDelete} 
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: 'transparent',
            border: '1px solid #ff4444',
            color: '#ff4444',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;
