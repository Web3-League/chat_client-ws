// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Add userId state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializedAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const decodedToken = jwtDecode(storedToken);
          setUserId(decodedToken.userId); // Extract userId from token
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', storedToken);
          setIsAuthenticated(false);
        }
      }else{
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    if(!token){
      initializedAuth();
    }else{
      try{
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId); // Extract userId from token
        setIsAuthenticated(true);
      }catch (error) {
        console.error('Invalid token:', token);
        setIsAuthenticated(false);
      }
      setLoading(false);
    }
  }, [token]);

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.16:3000/auth/register', {
        username,
        email,
        password,
      });
      const token = response.data.token;
      console.log('Token received on register:', token);
      setToken(token);
      await AsyncStorage.setItem('token', token);
      
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId); // Extract userId from token
      setIsAuthenticated(true);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Registration failed');
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.16:3000/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      console.log('Token received on login:', token);
      setToken(token);
      await AsyncStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId); // Extract userId from token
      setIsAuthenticated(true);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out');
    setToken(null);
    setUser(null);
    setUserId(null); // Clear userId
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, isAuthenticated, register, login, logout, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };


