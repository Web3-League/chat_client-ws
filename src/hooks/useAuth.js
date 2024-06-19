// src/hooks/useAuth.js
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const { user, token, loading, login, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      console.log('User is authenticated', user.id);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [token, navigate]);

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
