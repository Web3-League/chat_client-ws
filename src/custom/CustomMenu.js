import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/CustomMenu.css';
import './styles/CustomMenuItem.css';

const CustomMenu = ({ children, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="custom-menu" ref={menuRef}>
      {children}
    </div>
  );
};

const CustomMenuItem = ({ onClick, to, children }) => (
  <Link to={to} className="custom-menu-item" onClick={onClick}>
    {children}
  </Link>
);

export { CustomMenu, CustomMenuItem };
