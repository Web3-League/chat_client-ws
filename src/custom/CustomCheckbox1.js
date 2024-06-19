import React from 'react';
import './styles/CustomCheckbox1.css';

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default CustomCheckbox;
