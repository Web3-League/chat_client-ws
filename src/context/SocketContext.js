import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (token) {
      console.log('Socket connecting with token:', token);
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

      setSocket(newSocket);

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

      newSocket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('typing', (data) => {
        setTypingUsers((prevTypingUsers) => {
          if (!prevTypingUsers.includes(data.user)) {
            return [...prevTypingUsers, data.user];
          }
          return prevTypingUsers;
        });
      });

      newSocket.on('stop_typing', (data) => {
        setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((user) => user !== data.user));
      });

      newSocket.on('servers', (data) => {
        setServers(data.servers);
      });

      newSocket.on('server_created', (server) => {
        setServers((prevServers) => [...prevServers, server]);
      });

      newSocket.on('serverDeleted', (serverId) => {
        setServers((prevServers) => prevServers.filter((server) => server.id !== serverId));
      });

      newSocket.on('serverUpdated', (updatedServer) => {
        setServers((prevServers) => prevServers.map((server) =>
          server.id === updatedServer.id ? updatedServer : server
        ));
      });

      newSocket.on('channelCreated', (channel) => {
        setChannels((prevChannels) => [...prevChannels, channel]);
      });

      newSocket.on('channelDeleted', (channelId) => {
        setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== channelId));
      });

      newSocket.on('channelUpdated', (updatedChannel) => {
        setChannels((prevChannels) => prevChannels.map((channel) =>
          channel.id === updatedChannel.id ? updatedChannel : channel
        ));
      });

      newSocket.on('fetched_channels', (channel) => {
        console.log('Fetched channels:', channel);
        setChannels(channel);
      });

      newSocket.on('channel', (channel) => {
        console.log('Received channels:', channel);
        setChannels(channel);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  const sendMessage = useCallback((message) => {
    if (socket) {
      socket.emit('message', message);
    }
  }, [socket]);

  const sendReaction = useCallback((messageId, emoji) => {
    if (socket) {
      socket.emit('reaction', { messageId, emoji });
    }
  }, [socket]);

  const handleTyping = useCallback((user) => {
    if (socket) {
      socket.emit('typing', { user });
    }
  }, [socket]);

  const stopTyping = useCallback((user) => {
    if (socket) {
      socket.emit('stop_typing', { user });
    }
  }, [socket]);

  const deleteMessage = useCallback((messageId) => {
    if (socket) {
      socket.emit('delete_message', { messageId });
    }
  }, [socket]);

  const fetchServers = useCallback((userId) => {
    if (socket) {
      socket.emit('fetch_servers', { userId });
    }
  }, [socket]);

  const createServer = useCallback((serverData, userId) => {
    if (socket) {
      console.log('Sending create_server event with userId:', userId);
      socket.emit('create_server', { ...serverData, owner: userId });
    }
  }, [socket]);

  const deleteServer = useCallback((serverId) => {
    if (socket) {
      socket.emit('delete_server', { serverId });
    }
  }, [socket]);

  const updateServer = useCallback((serverId, serverData) => {
    if (socket) {
      socket.emit('update_server', { serverId, ...serverData });
    }
  }, [socket]);

  const fetchChannels = useCallback((serverId) => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit('fetch_channels', { serverId }, (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.channels);
          }
        });
      } else {
        reject('Socket not connected');
      }
    });
  }, [socket]);

  const createChannel = useCallback((channelData) => {
    if (socket) {
      socket.emit('create_channel', channelData);
    }
  }, [socket]);

  const deleteChannel = useCallback((channelId) => {
    if (socket) {
      socket.emit('delete_channel', { channelId });
    }
  }, [socket]);

  const updateChannel = useCallback((channelData) => {
    if (socket) {
      socket.emit('update_channel', channelData);
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      messages,
      typingUsers,
      servers,
      channels,
      sendMessage,
      sendReaction,
      handleTyping,
      stopTyping,
      deleteMessage,
      fetchServers,
      createServer,
      deleteServer,
      updateServer,
      fetchChannels,
      createChannel,
      deleteChannel,
      updateChannel,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
