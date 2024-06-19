import React, { useState } from 'react';
import useChatSocket from '../messageSocketClient';
import CustomTextField from '../custom/CustomTextField';
import CustomButton from '../custom/CustomButton';
import { CustomList, CustomListItem } from '../custom/CustomList';
import CustomTypography from '../custom/CustomTypography';
import {CustomGrid, CustomBox } from '../custom/CustomGrid';
import Header from '../layout/Header';
import './styles/Search.css';

const Search = ({ darkMode, user, toggleDarkMode }) => {
  const [server, setServer] = useState(null);
  const [query, setQuery] = useState('');
  const { searchResults, handleSearch } = useChatSocket(user, null, () => { }, () => { });

  const handleSearchClick = () => {
    console.log(`Searching for: ${query}`);
    handleSearch(query);
  };

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} serverName={server ? server.name : null} />
      <CustomBox>
        <CustomGrid container spacing={3}>
          <CustomGrid item xs={12}>
            <CustomTypography variant="h6">
              Search Users, Channels, and Servers
            </CustomTypography>
          </CustomGrid>
          <CustomGrid item xs={12} sm={8}>
            <CustomTextField
              label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
            />
          </CustomGrid>
          <CustomGrid item xs={12} sm={4}>
            <CustomButton onClick={handleSearchClick} fullWidth>
              Search
            </CustomButton>
          </CustomGrid>
          <CustomGrid item xs={12}>
            <CustomList>
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <CustomListItem key={index}>
                    {result.name || result.username}
                  </CustomListItem>
                ))
              ) : (
                <CustomTypography variant="body1">
                  No results found
                </CustomTypography>
              )}
            </CustomList>
          </CustomGrid>
        </CustomGrid>
      </CustomBox>
    </>
  );
};

export default Search;


