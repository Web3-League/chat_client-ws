import React from 'react';
import './styles/CustomIconButton.css';

const CustomIconButton = ({ children, onClick }) => {
  return (
    <button className="custom-icon-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomIconButton;
