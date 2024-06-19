// src/components/custom/Row.js
import React from 'react';
import './styles/Row.css';

const Row = ({ children, gridColumn }) => {
  return (
    <div className="row" style={{ gridColumn }}>
      {children}
    </div>
  );
};

export default Row;
