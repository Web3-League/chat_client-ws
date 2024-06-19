// src/components/ChannelManagementComponent.js
import React, { useState } from 'react';
import { useChannels } from '../hooks/useChannels';

const ChannelManagementComponent = () => {
  const { channels, createChannel, updateChannel, deleteChannel } = useChannels();
  const [channelName, setChannelName] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleCreateChannel = () => {
    createChannel(channelName, 1); // Assuming you have the serverId
    setChannelName('');
  };

  const handleUpdateChannel = () => {
    if (selectedChannel) {
      updateChannel(selectedChannel.id, channelName, 1); // Assuming you have the serverId
    }
  };

  const handleDeleteChannel = (channelId) => {
    deleteChannel(channelId);
  };

  return (
    <div>
      <div>
        {channels.map((channel) => (
          <div key={channel.id}>
            {channel.name}
            <button onClick={() => handleDeleteChannel(channel.id)}>Delete</button>
            <button onClick={() => setSelectedChannel(channel)}>Edit</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Channel Name"
      />
      <button onClick={handleCreateChannel}>Create Channel</button>
      <button onClick={handleUpdateChannel}>Update Channel</button>
    </div>
  );
};

export default ChannelManagementComponent;
