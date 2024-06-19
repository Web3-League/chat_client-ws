// src/pages/Inscription.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterComponent from '../components/RegisterComponent';
import authSocketClient from '../authSocketClient';

const Inscription = () => {
  const navigate = useNavigate();

  const handleRegister = (userData) => {
    authSocketClient.register(userData);
    navigate('/login');
  };

  return (
    <div>
      <RegisterComponent handleRegister={handleRegister} />
    </div>
  );
};

export default Inscription;

