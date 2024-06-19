// src/customLayout/SidebarRightSection.js
import React , { useContext } from 'react';
import CustomBox from '../custom/CustomBox';
import { AuthContext } from '../context/AuthContext';


const SidebarRightSection = () => {
  const { userId } = useContext(AuthContext); // Get userId from AuthContext

  return (
    <CustomBox gridColumn="10 / span 1" gridRow="2 / span 8">
      <div>ID USER: {userId}</div>
    </CustomBox>
  );
};

export default SidebarRightSection;