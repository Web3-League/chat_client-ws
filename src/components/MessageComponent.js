import React, { useEffect, useState } from 'react';
import chatSocketClient from '../messageSocketClient'; // Mettez le chemin correct

const MessageComponent = ({ selectedChannel }) => {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    const updateMessages = () => {
      setMessages(chatSocketClient.getMessages());
    };

    const updateTypingUser = () => {
      setTypingUser(chatSocketClient.getTypingUser());
    };

    if (selectedChannel) {
      chatSocketClient.socket.emit('joinChannel', { channelId: selectedChannel.id });
    }

    chatSocketClient.socket.on('message', updateMessages);
    chatSocketClient.socket.on('reaction', updateMessages);
    chatSocketClient.socket.on('history', updateMessages);
    chatSocketClient.socket.on('typing', updateTypingUser);
    chatSocketClient.socket.on('messageUpdated', updateMessages);
    chatSocketClient.socket.on('messageDeleted', updateMessages);

    return () => {
      chatSocketClient.socket.off('message', updateMessages);
      chatSocketClient.socket.off('reaction', updateMessages);
      chatSocketClient.socket.off('history', updateMessages);
      chatSocketClient.socket.off('typing', updateTypingUser);
      chatSocketClient.socket.off('messageUpdated', updateMessages);
      chatSocketClient.socket.off('messageDeleted', updateMessages);
    };
  }, [selectedChannel]);

  const handleSendMessage = (text, file) => {
    chatSocketClient.sendMessage(text, file, selectedChannel.id);
  };

  const handleUpdateMessage = (messageId, text, file) => {
    chatSocketClient.updateMessage(messageId, text, file);
  };

  const handleDeleteMessage = (messageId) => {
    chatSocketClient.deleteMessage(messageId);
  };

  const handleSendReaction = (messageId, emoji) => {
    chatSocketClient.sendReaction(messageId, emoji);
  };

  const handleTyping = () => {
    chatSocketClient.handleTyping(selectedChannel.id);
  };

  return (
    <div>
      <h1>Messages</h1>
      {typingUser && <p>{typingUser} is typing...</p>}
      <button onClick={() => handleSendMessage('Hello', null)}>Send Message</button>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            {msg.text}
            <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
            <button onClick={() => handleUpdateMessage(msg.id, 'Updated Text', null)}>Update</button>
            <button onClick={() => handleSendReaction(msg.id, '👍')}>👍</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;
