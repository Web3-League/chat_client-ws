import React, { useState } from 'react';
import useServers from './hooks/useServers';

const CreateServerForm = () => {
  const [name, setName] = useState('');
  const { createServer, error } = useServers();

  const handleSubmit = (e) => {
    e.preventDefault();
    createServer(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter server name"
      />
      <button type="submit">Create Server</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateServerForm;
