import React from 'react';
import './styles/Height.css';

const Height = ({ height, children }) => {
  return <div className={`height-${height}`}>{children}</div>;
};

export default Height;
