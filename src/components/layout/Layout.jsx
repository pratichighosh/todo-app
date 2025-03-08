import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { theme } = useSelector(state => state.ui);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  // Toggle functions for mobile sidebar visibility
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
    if (rightSidebarOpen) setRightSidebarOpen(false);
  };
  
  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
    if (leftSidebarOpen) setLeftSidebarOpen(false);
  };
  
  // Close sidebars when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Prevent body scrolling when mobile sidebars are open
  useEffect(() => {
    if (leftSidebarOpen || rightSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [leftSidebarOpen, rightSidebarOpen]);
  
  return (
    <div className={`app-container ${theme}`}>
      <Header 
        toggleLeftSidebar={toggleLeftSidebar} 
        toggleRightSidebar={toggleRightSidebar} 
      />
      
      <div className="content-wrapper">
        {/* Backdrop overlay for mobile */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div 
            className="sidebar-overlay"
            onClick={() => {
              setLeftSidebarOpen(false);
              setRightSidebarOpen(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 30,
              display: 'block'
            }}
          />
        )}
        
        {/* Left Sidebar with open/closed state */}
        <Sidebar isOpen={leftSidebarOpen} closeSidebar={() => setLeftSidebarOpen(false)} />
        
        <MainContent>
          {children}
        </MainContent>
        
        {/* Right Sidebar with open/closed state */}
        <RightSidebar isOpen={rightSidebarOpen} closeSidebar={() => setRightSidebarOpen(false)} />
      </div>
    </div>
  );
};

export default Layout;