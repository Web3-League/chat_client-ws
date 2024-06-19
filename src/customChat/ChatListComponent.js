import React, { useEffect } from 'react';
import useSocket2 from '../hooks/useSocket';

const ChatListComponent = ({ channelId }) => {
  const { messages, fetchMessages, joinChannel, leaveChannel } = useSocket2();

  useEffect(() => {
    if (channelId) {
      joinChannel(channelId);
      fetchMessages(channelId);


    }
  }, [channelId, joinChannel, leaveChannel, fetchMessages]);

  return (
    <div>
      <button onClick={() => fetchMessages(channelId)}>Load Messages</button>
      <div>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index}>
              <strong>{message.user.username}:</strong> {message.text}
            </div>
          ))
        ) : (
          <p>No messages in this channel: {channelId}</p>
        )}
      </div>
    </div>
  );
};

export default ChatListComponent;



