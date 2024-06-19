import React, { useState } from 'react';
import useChannels from './hooks/useChannels';

const UpdateChannelForm = ({ channel }) => {
  const [name, setName] = useState(channel.name);
  const { updateChannel } = useChannels();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateChannel(channel.id, name, channel.serverId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter updated channel name"
      />
      <button type="submit">Update Channel</button>
    </form>
  );
};

export default UpdateChannelForm;
