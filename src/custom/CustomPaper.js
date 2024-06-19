import React from 'react';
import './styles/CustomPaper.css';

const CustomPaper = ({ children, className }) => {
  return <div className={`custom-paper ${className}`}>{children}</div>;
};

export default CustomPaper;
