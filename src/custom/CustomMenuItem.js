import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CustomMenuItem.css';

const CustomMenuItem = ({ onClick, to, children }) => {
  return (
    <Link className="custom-menu-item" to={to} onClick={onClick}>
      {children}
    </Link>
  );
};

export default CustomMenuItem;
