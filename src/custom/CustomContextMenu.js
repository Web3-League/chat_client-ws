import React from 'react';
import './styles/CustomContextMenu.css';

const CustomContextMenu = ({ x, y, show, onDelete, onClose }) => {
  if (!show) return null;

  return (
    <div className="context-menu-overlay" onClick={onClose}>
      <div
        className="custom-context-menu"
        style={{ top: y, left: x }}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing menu
      >
        <button onClick={onDelete} className="context-menu-item">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomContextMenu;

