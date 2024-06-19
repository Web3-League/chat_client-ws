import React, { useState, useEffect, useContext } from 'react';
import CustomBox from '../custom/CustomBox';
import useSocket from '../hooks/useSocket';
import { useAuth, AuthContext } from '../context/AuthContext';

const SidebarSection = ({ setServer }) => {
  const { user } = useAuth();
  const { servers, fetchServers, createServer } = useSocket();
  const [serverName, setServerName] = useState('');
  const [selectedServerId, setSelectedServerId] = useState(null);
  const { userId } = useContext(AuthContext)

  useEffect(() => {
    if (userId) {
      console.log('Fetching servers for userId:', userId);
      fetchServers(userId);
    }
  }, [userId, fetchServers]);

  const handleCreateServer = () => {
    if (serverName.trim() && user) {
      console.log('Creating server with name:', serverName);
      createServer({ name: serverName }, userId);
      setServerName('');
    }
  };

  const handleServerClick = (server) => {
    setSelectedServerId(server.name);
    setServer(server);
  };

  return (
    <CustomBox gridColumn="1 / span 1" gridRow="2 / span 8">
      <div>
        <h2>Servers</h2>
        <ul>
          {servers.map((server) => (
            <li key={server.id} onClick={() => handleServerClick(server)}>
              {server.name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          placeholder="Server name"
        />
        <button onClick={handleCreateServer}>Create Server</button>

      </div>

    </CustomBox>
  );
};

export default SidebarSection;


