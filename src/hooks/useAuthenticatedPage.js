// src/hooks/useAuthenticatedPage.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useAuthenticatedPage = () => {
  const { isAuthenticated, loading, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, token, navigate]);

  return { isAuthenticated, loading };
};

export default useAuthenticatedPage;
