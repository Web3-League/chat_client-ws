import React, { useEffect, useState } from 'react';
import chatSocketClient from '../serverSocketClient'; // Mettez le chemin correct

const ServerComponent = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const updateServers = () => {
      setServers(chatSocketClient.getServers());
    };

    chatSocketClient.fetchServers();

    chatSocketClient.socket.on('servers', updateServers);
    chatSocketClient.socket.on('serverCreated', updateServers);
    chatSocketClient.socket.on('serverDeleted', updateServers);
    chatSocketClient.socket.on('serverUpdated', updateServers);

    return () => {
      chatSocketClient.socket.off('servers', updateServers);
      chatSocketClient.socket.off('serverCreated', updateServers);
      chatSocketClient.socket.off('serverDeleted', updateServers);
      chatSocketClient.socket.off('serverUpdated', updateServers);
    };
  }, []);

  const handleCreateServer = (serverData) => {
    chatSocketClient.createServer(serverData);
  };

  const handleDeleteServer = (serverId) => {
    chatSocketClient.deleteServer(serverId);
  };

  const handleUpdateServer = (serverId, serverData) => {
    chatSocketClient.updateServer(serverId, serverData);
  };

  return (
    <div>
      <h1>Servers</h1>
      <button onClick={() => handleCreateServer({ name: 'New Server', category: 'General' })}>Create Server</button>
      <ul>
        {servers.map(server => (
          <li key={server.id}>
            {server.name}
            <button onClick={() => handleDeleteServer(server.id)}>Delete</button>
            <button onClick={() => handleUpdateServer(server.id, { name: 'Updated Server', category: 'Updated Category' })}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerComponent;

