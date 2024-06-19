import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const TypingComponent = ({ username }) => {
  const { socket } = useContext(SocketContext);

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', username);
    }
  };

  const handleStopTyping = () => {
    if (socket) {
      socket.emit('stop_typing', username);
    }
  };

  return (
    <div>
      <input
        type="text"
        onFocus={handleTyping}
        onBlur={handleStopTyping}
        placeholder="Type a message"
      />
    </div>
  );
};

export default TypingComponent;
