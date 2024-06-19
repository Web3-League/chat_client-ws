import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const useSocket3 = () => {
  const { token, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    if (token) {
      const isLocalhost = window.location.hostname === 'localhost';
      const socketUrl = isLocalhost ? 'http://localhost:3000' : 'http://192.168.1.16:3000';

      const newSocket = io(socketUrl, {
        auth: { token },
        transports: ['websocket', 'polling'],
        secure: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        rejectUnauthorized: false,
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

      newSocket.on('servers', (data) => {
        console.log('Received servers:', data.servers);
        setServers(data.servers);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  const fetchServers = useCallback(() => {
    if (socket && user) {
      console.log('Emitting fetch_servers event for user:', user.id);
      socket.emit('fetch_servers', { userId: user.id });
    }
  }, [socket, user]);

  return {
    socket,
    isConnected,
    servers,
    fetchServers,
  };
};

export default useSocket3;
