import React from 'react';
import { useAuth } from './AuthContext';

function Learn() {
  const { userData } = useAuth();
  
  return (
    <>
      {userData?.status === 'P' ? (
        <div className="premium-content">
          <h2>Welcome to The Better Man Bootcamp</h2>
          <p>You have full access to all fundamentals, IRL side quests, and the private community.</p>
        </div>
      ) : (
        <div className="free-content">
          <h2>Welcome to the Free Tier</h2>
          <p>You have access to selected Grooming, Physique, and Social material.</p>
          <div className="upgrade-prompt">
            <h3>Want the full experience?</h3>
            <a href="/" className="upgrade-btn">Upgrade to Bootcamp</a>
          </div>
        </div>
      )}
    </>
  );
}

export default Learn;
