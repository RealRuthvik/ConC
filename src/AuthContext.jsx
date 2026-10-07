import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Mock check for existing session
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser({ uid: '123', email: parsed.email });
      setUserData(parsed);
    }
  }, []);

  const signup = async (email, password, status = 'Free') => {
    const data = { email, status };
    localStorage.setItem('mockUser', JSON.stringify(data));
    setCurrentUser({ uid: '123', email });
    setUserData(data);
  };

  const loginWithGoogle = async (status = 'Free') => {
    const data = { email: 'user@example.com', status };
    localStorage.setItem('mockUser', JSON.stringify(data));
    setCurrentUser({ uid: '123', email: data.email });
    setUserData(data);
  };

  const logout = () => {
    localStorage.removeItem('mockUser');
    setCurrentUser(null);
    setUserData(null);
  };

  const updateStatus = async (status) => {
    if (userData) {
      const updated = { ...userData, status };
      localStorage.setItem('mockUser', JSON.stringify(updated));
      setUserData(updated);
    }
  };

  const value = {
    currentUser,
    userData,
    signup,
    loginWithGoogle,
    logout,
    updateStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
