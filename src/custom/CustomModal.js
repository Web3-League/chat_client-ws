import React from 'react';
import './styles/CustomModal.css';

const CustomModal = ({ open, handleClose, title, handleSubmit, children }) => {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('custom-modal-overlay')) {
      handleClose();
    }
  };

  return (
    <div className="custom-modal-overlay" onClick={handleOverlayClick}>
      <div className="custom-modal">
        <h2>{title}</h2>
        <div className="custom-modal-content">
          {children}
        </div>
        <div className="custom-modal-actions">
          <button onClick={handleSubmit} className="custom-modal-submit">Submit</button>
          <button onClick={handleClose} className="custom-modal-close">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
