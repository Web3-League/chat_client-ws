// src/customLayout/Header.js
import React from 'react';
import './styles/Header.css'; // Ensure the correct styles are imported


const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
      <h1>App Header</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </header>
  );
};

export default Header;
