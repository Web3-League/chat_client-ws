import React from 'react';
import ChatComponent from '../customChat/ChatComponent';
import CustomBox from '../custom/CustomBox';
import './styles/FooterSection.css';

const FooterSection = ({ darkMode, channelId }) => (
  <CustomBox gridColumn="1 / span 10" gridRow="10 / span 1">
    <div>
      {channelId ? <ChatComponent channelId={channelId} /> : <div>No channel selected</div>}
    </div>
  </CustomBox>
);

export default FooterSection;
