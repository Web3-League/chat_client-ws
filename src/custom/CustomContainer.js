import React from 'react';
import './styles/CustomContainer.css';

const CustomContainer = ({ children }) => (
  <div className="custom-container">
    {children}
  </div>
);

export default CustomContainer;
