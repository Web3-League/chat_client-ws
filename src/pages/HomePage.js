import React, { useState, useContext } from 'react';
import { CustomGrid } from '../custom/CustomGrid';
import HeaderSection from '../customLayout/HeaderSection';
import SidebarSection from '../customLayout/SidebarSection';
import MainSection from '../customLayout/MainSection';
import SidebarRightSection from '../customLayout/SidebarRightSection';
import FooterSection from '../customLayout/FooterSection';
import SidebarSection2 from '../customLayout/SidebarSection2';
import useAuthenticatedPage from '../hooks/useAuthenticatedPage';
import { AuthContext } from '../context/AuthContext';
import useSocket from '../hooks/useSocket';
import './styles/HomePage.css';

const HomePage = () => {
  const { isAuthenticated, loading } = useAuthenticatedPage();
  const { userId } = useContext(AuthContext);
  const [server, setServer] = useState(null);
  const [channel, setChannel] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { fetchChannels, createChannel } = useSocket();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Optionally render a loading or unauthorized component
  }


  return (
    <CustomGrid className="home-page">
      <HeaderSection darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <SidebarSection setServer={setServer} setChannel={setChannel}  />
      <SidebarSection2
        selectedServerId={server ? server.id : null}
        fetchChannels={fetchChannels}
        createChannel={createChannel}
        setChannel={setChannel}
      />
      <MainSection
        channelId={channel? channel.id: null}
      />
      <SidebarRightSection userId={server? server.ownerId : userId} />
      <FooterSection darkMode={darkMode} channelId={channel? channel.id : null} />
      <div>CHANNEL ID : {channel? channel.id : null}</div>
    </CustomGrid>
  );
};

export default HomePage;



