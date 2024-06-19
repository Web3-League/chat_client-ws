import React from 'react';
import './styles/CustomSwitch.css';

const CustomSwitch = ({ checked, onChange }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider round"></span>
  </label>
);

export default CustomSwitch;
