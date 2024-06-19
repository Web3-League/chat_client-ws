import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const MessageComponent = ({ channelId }) => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { text: message, channelId });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageComponent;
