import React from 'react';
import './styles/CustomDeleteModal.css';

const CustomDeleteModal = ({ open, handleClose, handleDelete, itemName }) => {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete {itemName}?</p>
        <button onClick={handleDelete} className="confirm-delete-button">
          Confirm
        </button>
        <button onClick={handleClose} className="cancel-delete-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomDeleteModal;

