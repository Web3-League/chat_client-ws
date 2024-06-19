import React, { useState } from 'react';
import useServers from '../hooks/useServers'; // Correctly import useServers

const CreateServerComponent = () => {
  const [serverName, setServerName] = useState('');
  const { createServer, error } = useServers();

  const handleCreateServer = () => {
    if (serverName.trim()) {
      createServer(serverName);
      setServerName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        placeholder="Server name"
      />
      <button onClick={handleCreateServer}>Create Server</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default CreateServerComponent;



