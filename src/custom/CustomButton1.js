import React from 'react';
import './styles/CustomButton1.css';

const CustomButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="custom-button">
      {children}
    </button>
  );
};

export default CustomButton;
