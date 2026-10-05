import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const roadmapData = [
  { level: 1, name: "Grooming", price: "Free", desc: "Take care of the details.", status: "unlocked" },
  { level: 2, name: "Physique", price: "Free", desc: "Build a body you're proud of.", status: "unlocked" },
  { level: 3, name: "Style", price: "$2 | £2 | ₹200 | ¥300", desc: "Learn what actually suits you.", status: "locked" },
  { level: 4, name: "Presence", price: "$2 | £2 | ₹200 | ¥300", desc: "Become comfortable in your own skin.", status: "locked" },
  { level: 5, name: "Life", price: "$2 | £2 | ₹200 | ¥300", desc: "Build the habits and life that support everything else.", status: "locked" }
];

function Courses() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="courses-page">
      <button onClick={() => navigate('/')} className="back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', marginTop: '-1px' }}>
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        BACK
      </button>

      <div className="roadmap-header">
        <h1 className="courses-title">Let's Get You Back in the Game.</h1>
      </div>

      <div className="roadmap-timeline">
        {roadmapData.map((node) => (
          <div key={node.level} className={`roadmap-node ${node.status}`}>
            <div className="node-marker">
              <span className="node-level">LVL {node.level}</span>
            </div>
            <div className="node-content">
              <div className="node-header">
                <h2 className="node-name">{node.name}</h2>
                <span className={`price-tag ${node.status === 'unlocked' ? 'free' : 'paid'}`}>
                  {node.price}
                </span>
              </div>
              <p className="node-desc">{node.desc}</p>
              <button className={`node-btn ${node.status}`}>
                {node.status === 'unlocked' ? 'LEARN' : 'BUY'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
