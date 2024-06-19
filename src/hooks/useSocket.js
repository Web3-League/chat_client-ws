import { useState, useEffect, useCallback , useContext} from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { AuthContext } from '../context/AuthContext';


const typingTimeouts = {};
const useSocket = () => {
  const { token, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);  // Corrected state for typing users
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const { userId } = useContext(AuthContext)

 

  useEffect(() => {
    if (token) {
      console.log('Connecting to socket... user :', userId);
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
        console.log('Server created:', server);
        setServers((prevServers) => [...prevServers, server]);
      });

      newSocket.on('serverDeleted', (serverId) => {
        setServers((prevServers) => prevServers.filter(server => server.id !== serverId));
      });

      newSocket.on('serverUpdated', (updatedServer) => {
        setServers((prevServers) => prevServers.map(server =>
          server.id === updatedServer.id ? updatedServer : server
        ));
      });

      newSocket.on('channels', (channels) => {
        console.log('Received channels:', channels);
        setChannels(channels);
      });

      newSocket.on('fetched_channels', (channels) => {
        console.log('Received channels:', channels);
        setChannels(channels);
      });

      newSocket.on('channelCreated', (channel) => {
        setChannels((prevChannels) => [...prevChannels, channel]);
      });

      newSocket.on('channelDeleted', (channelId) => {
        setChannels((prevChannels) => prevChannels.filter(channel => channel.id !== channelId));
      });

      newSocket.on('channelUpdated', (updatedChannel) => {
        setChannels((prevChannels) => prevChannels.map(channel =>
          channel.id === updatedChannel.id ? updatedChannel : channel
        ));
      });

      newSocket.on('user_typing', (username) => {
        setTypingUsers((prevTypingUsers) => {
          if (!prevTypingUsers.includes(username)) {
            return [...prevTypingUsers, username];
          }
          return prevTypingUsers;
        });
      });

      newSocket.on('stop_typing', (username) => {
        setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((user) => user !== username));
      });

      newSocket.on('channels', (channels) => {
        console.log('Received channels:', channels);
        setChannels(channels);
      });

      newSocket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('user_typing', (data) => {
        setTypingUsers((prevTypingUsers) => {
          if (!prevTypingUsers.includes(data.username)) {
            return [...prevTypingUsers, data.username];
          }
          return prevTypingUsers;
        });

        if (typingTimeouts[data.username]) {
          clearTimeout(typingTimeouts[data.username]);
        }

        typingTimeouts[data.username] = setTimeout(() => {
          setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((user) => user !== data.username));
        }, 3000); // Stop displaying typing after 3 seconds
      });

      newSocket.on('messages', (messages) => {
        console.log('Received messages:', messages); // Debug log
        setMessages(messages);
      });

      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, [token]);

  const fetchServers = useCallback((userId) => {
    if (socket) {
      console.log('Sending fetch_servers event with userId:', userId)
      console.log('Emitting fetch_servers event for userId:', userId);
      socket.emit('fetch_servers', { userId });
    }
  }, [socket]);

  const createServer = useCallback((serverData, userId) => {
    if (socket) {
      console.log('Sending create_server event with userId:', userId);
      socket.emit('create_server', { ...serverData, owner: userId });
    }
  }, [socket]);


  const fetchChannels = useCallback((serverId) => {
    if (socket) {
      console.log('Emitting fetch_channels event for serverId:', serverId);
      socket.emit('fetch_channels', { serverId });
    }
  }, [socket]);

  const createChannel = useCallback((serverId, channelName) => {
    if (socket) {
      console.log('Creating channel for serverId:', serverId, 'with name:', channelName);
      socket.emit('create_channel', { serverId, name: channelName });
    }
  }, [socket]);


  const stopTyping = useCallback(() => {
    if (socket && user) {
      socket.emit('stop_typing', user.username);
    }
  }, [socket]);

  const fetchMessages = useCallback((channelId) => {
    if (socket) {
      console.log('Emitting get_messages event for channelId:', channelId);
      socket.emit('get_messages', { channelId });
    }
  });

  const joinChannel = useCallback((channelId) => {
    if (socket) {
      socket.emit('joinChannel', { channelId });
    }
  });

  const leaveChannel = useCallback((channelId) => {
    if (socket) {
      socket.emit('leaveChannel', { channelId });
    }
  });

  const sendMessage = useCallback((channelId, text) => {
    if (socket && userId) {
      socket.emit('send_message', { userId, text, channelId });
    }
  });

  const startTyping = useCallback((channelId) => {
    if (socket && user) {
      socket.emit('typing', { username: user.username, channelId });

      if (typingTimeouts[user.username]) {
        clearTimeout(typingTimeouts[user.username]);
      }

      typingTimeouts[user.username] = setTimeout(() => {
        setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((user) => user !== user.username));
      }, 3000); // Automatically stop typing after 3 seconds
    }
  });

  return {
    socket,
    isConnected,
    messages,
    typingUsers,  // Corrected to use typingUsers state
    servers,
    channels,
    fetchServers,
    createServer,
    fetchChannels,
    createChannel,
    sendMessage,
    startTyping,
    stopTyping,
    joinChannel,
    leaveChannel,
    fetchMessages,
  };
};

export default useSocket;


