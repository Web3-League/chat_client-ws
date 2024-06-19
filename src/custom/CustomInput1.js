import React from 'react';
import './styles/CustomInput1.css';

const CustomInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="custom-input"
    />
  );
};

export default CustomInput;
