// src/context/WebSocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children, setShowLoginModal, setShowRegisterModal }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost';
    const socketUrl = isLocalhost ? 'http://localhost:3000' : 'http://192.168.1.16:3000';
    const socketInstance = io('http://192.168.1.16:3000', {
      
    });
    setSocket(socketInstance);

    socketInstance.on('authenticated', (userData) => {
      setUser(userData);
    });

    socketInstance.on('loginOrRegister', (data) => {
      console.log(data.message);
      if (data.type === 'login') {
        setShowLoginModal(true);
      } else if (data.type === 'register') {
        setShowRegisterModal(true);
      } else {
        console.error('Invalid message type');
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [setShowLoginModal, setShowRegisterModal]);

  const authenticateSocket = (token) => {
    socket.emit('authenticate', { token });
  };

  return (
    <WebSocketContext.Provider value={{ socket, user, authenticateSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
