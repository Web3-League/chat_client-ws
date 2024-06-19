import React from 'react';
import useChannels from './hooks/useChannels';

const DeleteChannelButton = ({ channel }) => {
  const { deleteChannel } = useChannels();

  const handleClick = () => {
    deleteChannel(channel.id);
  };

  return (
    <button onClick={handleClick}>Delete Channel</button>
  );
};

export default DeleteChannelButton;
