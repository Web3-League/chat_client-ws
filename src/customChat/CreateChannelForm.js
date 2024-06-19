import React, { useState } from 'react';
import useChannels from './hooks/useChannels';

const CreateChannelForm = ({ serverId }) => {
  const [name, setName] = useState('');
  const { createChannel } = useChannels();

  const handleSubmit = (e) => {
    e.preventDefault();
    createChannel(name, serverId);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter channel name"
      />
      <button type="submit">Create Channel</button>
    </form>
  );
};

export default CreateChannelForm;
