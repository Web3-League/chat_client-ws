import React from 'react';
import useChannels from './hooks/useChannels';

const ChannelList = ({ serverId }) => {
  const { channels } = useChannels();

  const filteredChannels = channels.filter((channel) => channel.serverId === serverId);

  return (
    <ul>
      {filteredChannels.map((channel) => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>
  );
};

export default ChannelList;
