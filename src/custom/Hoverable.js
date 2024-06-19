import React, { useState } from 'react';
import './styles/Hoverable.css';

const Hoverable = ({ children, onHoverEnter, onHoverLeave }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHoverEnter) {
      onHoverEnter();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHoverLeave) {
      onHoverLeave();
    }
  };

  return (
    <div 
      className="hoverable-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children(isHovered)}
    </div>
  );
};

export default Hoverable;

