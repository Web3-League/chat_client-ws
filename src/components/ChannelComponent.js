import React, { useEffect, useState } from 'react';
import chatSocketClient from '../chatSocketClient'; // Assurez-vous que le chemin est correct

const ChannelComponent = ({ selectedServer }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const updateChannels = () => {
      setChannels(chatSocketClient.getChannels());
    };

    if (selectedServer) {
      console.log(`Fetching channels for serverId: ${selectedServer.id}`);
      chatSocketClient.fetchChannels(selectedServer.id);
    }

    chatSocketClient.socket.on('channels', updateChannels);
    chatSocketClient.socket.on('channelCreated', updateChannels);
    chatSocketClient.socket.on('channelDeleted', updateChannels);
    chatSocketClient.socket.on('channelUpdated', updateChannels);

    return () => {
      chatSocketClient.socket.off('channels', updateChannels);
      chatSocketClient.socket.off('channelCreated', updateChannels);
      chatSocketClient.socket.off('channelDeleted', updateChannels);
      chatSocketClient.socket.off('channelUpdated', updateChannels);
    };
  }, [selectedServer]);

  const handleCreateChannel = (channelData) => {
    chatSocketClient.createChannel(channelData);
  };

  const handleDeleteChannel = (channelId) => {
    chatSocketClient.deleteChannel(channelId);
  };

  const handleUpdateChannel = (channelId, channelData) => {
    chatSocketClient.updateChannel(channelId, channelData);
  };

  return (
    <div>
      <h1>Channels</h1>
      <button onClick={() => handleCreateChannel({ name: 'New Channel', serverId: selectedServer.id })}>Create Channel</button>
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            {channel.name}
            <button onClick={() => handleDeleteChannel(channel.id)}>Delete</button>
            <button onClick={() => handleUpdateChannel(channel.id, { name: 'Updated Channel' })}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelComponent;
