import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Fetch user profile if we have a token
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/profile', {
            headers: { Authorization: token },
          });
          setUser(res.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

