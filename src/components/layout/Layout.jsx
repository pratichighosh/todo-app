import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { theme } = useSelector(state => state.ui);
  
  return (
    <div className={`app-container ${theme}`}>
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;