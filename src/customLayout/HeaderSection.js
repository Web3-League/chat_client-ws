import React from 'react';
import CustomBox from '../custom/CustomBox';
import Header from './Header';
import Logout from '../auth/Logout';

const HeaderSection = ({ darkMode, toggleDarkMode }) => (
  <CustomBox gridColumn="span 10" gridRow="1 / span 1">
    <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <Logout />
  </CustomBox>
);

export default HeaderSection;

