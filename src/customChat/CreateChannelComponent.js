import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const CreateChannelComponent = ({ serverId }) => {
  const { socket } = useContext(SocketContext);
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    if (socket) {
      socket.emit('create_channel', { name: channelName, serverId });

      socket.on('channelCreated', (data) => {
        console.log(data);
      });

      return () => {
        socket.off('channelCreated');
      };
    }
  }, [socket, serverId]);

  socket.on('channelCreated', (data) => {
    console.log(data);
  });

  const createChannel = () => {
    socket.emit('create_channel', { name: channelName, serverId });
  };

  return (
    <div>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Channel name"
      />
      <button onClick={createChannel}>Create Channel</button>
    </div>
  );
};

export default CreateChannelComponent;
