import React from 'react';
import './styles/CustomAppBar.css';

const CustomAppBar = ({ children }) => {
  return <div className="custom-app-bar">{children}</div>;
};

export default CustomAppBar;
