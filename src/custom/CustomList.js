import React from 'react';
import './styles/CustomList.css';

const CustomList = ({ children }) => (
  <ul className="custom-list">
    {children}
  </ul>
);

const CustomListItem = ({ children }) => (
  <li className="custom-list-item">
    {children}
  </li>
);

export { CustomList, CustomListItem };
