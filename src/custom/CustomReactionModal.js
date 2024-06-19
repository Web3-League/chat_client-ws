import React from 'react';
import './styles/CustomReactionModal.css';

const CustomReactionModal = ({ open, handleClose, handleReactionSelect }) => {
  if (!open) return null;

  const reactions = ['😀', '😢', '😡', '👍', '👎', '❤️'];

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a Reaction</h2>
        <div className="reaction-options">
          {reactions.map((reaction, index) => (
            <button key={index} onClick={() => handleReactionSelect(reaction)} className="reaction-option">
              {reaction}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomReactionModal;

