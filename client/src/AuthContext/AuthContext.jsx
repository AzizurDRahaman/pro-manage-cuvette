/* eslint-disable react/prop-types */
// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../constants';

// Create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(`${BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        setIsAuthenticated(true);
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    window.location.href="/sign-in"
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
