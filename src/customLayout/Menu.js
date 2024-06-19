import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from '../custom/MenuButton';
import CustomSwitch from '../custom/CustomSwitch';
import { CustomMenu, CustomMenuItem } from '../custom/CustomMenu';
import './styles/Menu.css';

const Menu = ({ user, darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`menu-bar ${darkMode ? 'dark' : 'light'}`}>
      <div className="toolbar">
        <MenuButton onClick={toggleMenu} />
        <CustomSwitch checked={darkMode} onChange={toggleDarkMode} />
      </div>
      {menuOpen && (
        <CustomMenu>
          <CustomMenuItem onClick={toggleMenu}>
            <Link to="/">Home</Link>
          </CustomMenuItem>
          <CustomMenuItem onClick={toggleMenu}>
            <Link to="/search">Search</Link>
          </CustomMenuItem>
          <CustomMenuItem onClick={toggleMenu}>
            <Link to="/profile">Profile</Link>
          </CustomMenuItem>
          <CustomMenuItem onClick={toggleMenu}>
            <Link to="/settings">Settings</Link>
          </CustomMenuItem>
        </CustomMenu>
      )}
    </header>
  );
};

export default Menu;

