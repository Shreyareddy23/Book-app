import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  },[]);
  const login = (userObj, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };
  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};
