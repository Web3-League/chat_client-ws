import React from 'react';
import './styles/CustomInput.css';

const CustomInput = ({ label, value, onChange, type = "text" }) => {
  return (
    <div className="custom-input">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default CustomInput;
