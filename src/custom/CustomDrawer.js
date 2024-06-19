import React from 'react';

const CustomDrawer = ({ open, onClose, children }) => (
  <div className={`custom-drawer ${open ? 'open' : ''}`}>
    <div className="drawer-overlay" onClick={onClose}></div>
    <div className="drawer-content">
      {children}
    </div>
  </div>
);

export default CustomDrawer;
