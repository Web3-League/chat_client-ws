import React, { useState, useEffect } from 'react';
import CustomBox from '../custom/CustomBox';
import ChatListComponent from '../customChat/ChatListComponent';
import './styles/MainSection.css';

const MainSection = ({ user, channel, messages, sendReaction, typingUser, handleTyping, messageClient, channelId }) => {

  return (
    <CustomBox gridColumn="3 / span 7" gridRow="2 / span 8">
      <div className="main-section">
        <h1>Message List</h1>
        <ChatListComponent
          messages={messages}
          channelId={channelId}
        />
      </div>
    </CustomBox>
  );
};

export default MainSection;





