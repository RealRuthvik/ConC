import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async (status = 'Free') => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const docRef = doc(db, 'users', result.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const newData = {
          email: result.user.email,
          status,
          createdAt: new Date().toISOString()
        };
        await setDoc(docRef, newData);
        setUserData(newData);
      } else {
        // If account exists, we could update the status here if we wanted
        // For now, let's just log them in and fetch their data
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateStatus = async (status) => {
    if (currentUser) {
      await setDoc(doc(db, 'users', currentUser.uid), { status }, { merge: true });
      setUserData(prev => ({ ...prev, status }));
    }
  };

  const value = {
    currentUser,
    userData,
    loginWithGoogle,
    logout,
    updateStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
