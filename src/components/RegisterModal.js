import React, { useState } from 'react';
import CustomModal from '../custom/CustomModal';
import { useWebSocket } from '../context/WebSocketContext';

const RegisterModal = ({ show, onHide }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authenticateSocket } = useWebSocket();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newToken = authenticateRegister(username, password);
    if (newToken) {
      localStorage.setItem('token', newToken);
      authenticateSocket(newToken);
      onHide();
    } else {
      alert('Registration failed');
    }
  };

  const authenticateRegister = (username, password) => {
    // Mock registration logic
    if (username && password) {
      return 'mock-token'; // Simulate a token
    }
    return null;
  };

  return (
    <CustomModal open={show} handleClose={onHide} title="Register" handleSubmit={handleSubmit}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </form>
    </CustomModal>
  );
};

export default RegisterModal;

