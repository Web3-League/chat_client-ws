import React from 'react';
import './styles/CustomCheckbox.css';

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <div className="custom-checkbox">
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
