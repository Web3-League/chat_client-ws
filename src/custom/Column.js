// src/components/custom/Column.js
import React from 'react';
import './styles/Column.css';

const Column = ({ children, span, className }) => {
  return (
    <div className={`column ${className}`} style={{ gridColumn: `span ${span}` }}>
      {children}
    </div>
  );
};

export default Column;
