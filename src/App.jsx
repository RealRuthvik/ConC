import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DashboardLayout from './DashboardLayout';
import Learn from './Learn';
import Settings from './Settings';
import { AuthProvider } from './AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router basename="/ConC/">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/learn" element={<Learn />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
