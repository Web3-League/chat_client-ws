// src/auth/Logout.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext); // Use the logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to clear the token and context
    navigate('/login'); // Navigate to the login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;

