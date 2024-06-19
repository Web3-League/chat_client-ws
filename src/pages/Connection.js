// src/pages/Connection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import authSocketClient from '../authSocketClient';

const Connection = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    authSocketClient.login(userData);
    navigate('/home');
  };

  return (
    <div>
      <LoginComponent handleLogin={handleLogin} />
    </div>
  );
};

export default Connection;

