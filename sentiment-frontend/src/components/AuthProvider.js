// src/components/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post('/auth/login', { username, password }); // Added /api prefix
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      console.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const signup = async (username, password) => {
    try {
      const res = await axios.post('/auth/signup', { username, password }); // Added /api prefix
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed';
      console.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;