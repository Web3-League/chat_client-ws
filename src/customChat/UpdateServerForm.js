import React, { useState } from 'react';
import useServers from './hooks/useServers';

const UpdateServerForm = ({ server }) => {
  const [name, setName] = useState(server.name);
  const { updateServer, error } = useServers();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateServer(server.id, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter updated server name"
      />
      <button type="submit">Update Server</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UpdateServerForm;
