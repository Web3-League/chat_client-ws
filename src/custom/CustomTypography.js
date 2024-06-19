import React from 'react';
import './styles/CustomTypography.css';

const CustomTypography = ({ variant, children }) => {
  const Tag = variant || 'p';
  return <Tag className={`custom-typography ${variant}`}>{children}</Tag>;
};

export default CustomTypography;

