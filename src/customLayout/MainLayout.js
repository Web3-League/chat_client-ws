import React, { useState, useEffect } from 'react';
import './styles/MainLayout.css';
import ChatListComponent from '../customChat/ChatListComponent';

// Dummy data for messages
const MainLayout = () => {
  const [messages, setMessages] = useState([]);
  const [channelId, setChannelId] = useState("");

  return (
    <div className="main-layout">
      <h1>Message List</h1>
      <ChatListComponent
        messages={messages}
        setMessages={setMessages}
        channelId={channelId}
      />
    </div>
  );
};

export default MainLayout;

