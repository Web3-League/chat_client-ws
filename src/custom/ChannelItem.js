import React from 'react';
import './styles/ChannelItem.css';

const ChannelItem = ({ channel, onClick }) => {
  return (
    <button className="channel-item" onClick={onClick}>
      {channel.name}
    </button>
  );
};

export default ChannelItem;
