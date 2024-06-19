import React, { useEffect, useState } from 'react';
import CustomBox from '../custom/CustomBox';
import useSocket1 from '../hooks/useSocket';

const SidebarSection2 = ({ selectedServerId, setChannel }) => {
  const { channels, fetchChannels, createChannel, setChannels } = useSocket1();
  const [newChannelName, setNewChannelName] = useState('');

  const fetchAndSetChannels = async (serverId) => {
    console.log(`Fetching channels for serverId: ${serverId}`);
    try {
      const fetchedChannels = await fetchChannels(serverId);
      console.log('Fetched channels:', fetchedChannels);
      if (Array.isArray(fetchedChannels)) {
        setChannels(fetchedChannels);
      } else {
        console.error('Fetched channels is not an array:', fetchedChannels);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  useEffect(() => {
    if (selectedServerId) {
      console.log('Selected Server ID in useEffect:', selectedServerId);
      fetchAndSetChannels(selectedServerId);
    }
  }, [selectedServerId]);

  const handleCreateChannel = async () => {
    if (newChannelName.trim() && selectedServerId) {
      try {
        await createChannel(selectedServerId, newChannelName);
        fetchAndSetChannels(selectedServerId); // Refresh the channels list after creating a new channel
      } catch (error) {
        console.error('Error creating channel:', error);
      }
      setNewChannelName(''); // Clear the input field
    }
  };

  const filteredChannels = selectedServerId
    ? channels.filter((channel) => channel.server.id === selectedServerId)
    : [];

  return (
    <CustomBox gridColumn="2 / span 1" gridRow="2 / span 8">
      <div>
        <h2>Selected Server ID:</h2>
        {selectedServerId ? <p>{selectedServerId}</p> : <p>No server selected</p>}
        <h2>Channels:</h2>
        <ul>
          {filteredChannels.map((channel) => (
            <li key={channel.id} onClick={() => setChannel(channel)}>
              {channel.name} (ID: {channel.id}, Server ID: {channel.server.id})
            </li>
          ))}
        </ul>
        {selectedServerId && (
          <div>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="New Channel Name"
            />
            <button onClick={handleCreateChannel}>Create Channel</button>
          </div>
        )}
      </div>
    </CustomBox>
  );
};

export default SidebarSection2;



