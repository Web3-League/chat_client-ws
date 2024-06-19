import React from 'react';
import './styles/TypingIndicator.css';

const typingIndicator = ({ typingUser }) => (
  <div className="typing-indicator">
    <div className="typoTyping">
      {typingUser}
    </div>
  </div>
);

export default typingIndicator;
