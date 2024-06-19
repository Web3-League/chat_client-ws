import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const SocketComponent = () => {
  const { token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketInstance;

    if (token) {
      // Determine if we are on localhost or on the network
      const isLocalhost = window.location.hostname === 'localhost';
      const socketUrl = isLocalhost ? 'http://localhost:3000' : 'http://192.168.1.16:3000';
      
      // Create the socket instance with authentication
      socketInstance = io(socketUrl, {
        transports: ['websocket'],
        auth: {
          token,
        },
      });

      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
      
      socketInstance.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      socketInstance.on('connect_error', (err) => {
        console.error('Connection error:', err);
      });

      // Clean up the connection when the component is unmounted
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [token]);

  return <div>WebSocket Connection Status: {socket ? 'Connected' : 'Disconnected'}</div>;
};

export default SocketComponent;

