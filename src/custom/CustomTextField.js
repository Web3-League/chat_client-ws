import React from 'react';
import './styles/CustomTextField.css';

const CustomTextField = ({ label, value, onChange }) => (
  <div className="custom-textfield">
    <label className="custom-textfield-label">{label}</label>
    <input
      className="custom-textfield-input"
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default CustomTextField;
