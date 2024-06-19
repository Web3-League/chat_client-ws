import React from 'react';
import useServers from './hooks/useServers';

const ServerList = () => {
  const { servers, loading, error } = useServers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {servers.map((server) => (
        <li key={server.id}>{server.name}</li>
      ))}
    </ul>
  );
};

export default ServerList;
