// src/components/ChatComponent.js
import React, { useState, useEffect, useContext } from 'react';
import useChat from '../hooks/useSocket';
import { AuthContext } from '../context/AuthContext';

const ChatComponent = ({ channelId }) => {
  const { messages, sendMessage, typingUsers, startTyping, joinChannel, leaveChannel } = useChat();
  const [message, setMessage] = useState('');
  const { userId } = useContext(AuthContext);


  useEffect(() => {
    if (channelId) {
      console.log('Joining channel:', channelId);
      joinChannel(channelId);

    }
  }, [channelId, joinChannel, leaveChannel]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(channelId, message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <div>
        {typingUsers.map((user, index) => (
          <span key={index}>{user} is typing...</span>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          startTyping(channelId);
        }}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;




