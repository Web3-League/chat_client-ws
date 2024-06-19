import React from 'react';
import './styles/CustomAvatarButton.css';

const CustomAvatarButton = ({ onClick }) => {
  return (
    <button className="custom-avatar-button" onClick={onClick}>
      <div className="custom-avatar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
};

export default CustomAvatarButton;

