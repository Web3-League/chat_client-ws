// src/components/custom/Scrollable.js
import React from 'react';
import './styles/Scrollable.css';

const Scrollable = ({ children }) => {
  return (
    <div className="scrollable">
      {children}
    </div>
  );
};

export default Scrollable;
