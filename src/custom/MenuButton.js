import React from 'react';
import menuIcon from '../../assets/menu-icon.svg';
import './styles/MenuButton.css';

const MenuButton = ({ onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      <img src={menuIcon} alt="Menu" />
    </button>
  );
};

export default MenuButton;
