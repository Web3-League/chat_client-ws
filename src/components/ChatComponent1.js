// src/components/ChatComponent.js
import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';

const ChatComponent1 = ({ channelId }) => {
  const { messages, typingUsers, sendMessage, startTyping, stopTyping } = useChat(channelId);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(''); // Assuming you have a way to get the current username

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
    stopTyping(username);
  };

  const handleTyping = () => {
    startTyping(username);
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
          <div key={index}>{user} is typing...</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        onBlur={() => stopTyping(username)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent1;
