import React from 'react';
import useServers from './hooks/useServers';

const DeleteServerButton = ({ server }) => {
  const { deleteServer, error } = useServers();

  const handleClick = () => {
    deleteServer(server.id);
  };

  return (
    <button onClick={handleClick}>Delete Server</button>
  );
};

export default DeleteServerButton;
