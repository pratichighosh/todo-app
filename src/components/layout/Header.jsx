import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import ThemeToggle from '../ui/ThemeToggle';
import ViewToggle from '../ui/ViewToggle';

// Import the logo properly
import logo from '../../assets/images/logo512.png'; // Adjust path as needed

const Header = ({ toggleLeftSidebar, toggleRightSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Toggle menu dropdown
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Handle sidebar selection
  const handleLeftSidebar = () => {
    toggleLeftSidebar();
    setMenuOpen(false);
  };
  
  const handleRightSidebar = () => {
    toggleRightSidebar();
    setMenuOpen(false);
  };
  
  return (
    <header className="header">
      <div className="header-left">
        {/* Menu button with dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="menu-icon">☰</span>
          </button>
          
          {/* Menu dropdown */}
          {menuOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'var(--card-bg, white)',
                border: '1px solid var(--border-color, #e0e0e0)',
                borderRadius: 'var(--border-radius, 8px)',
                boxShadow: 'var(--shadow, 0 2px 8px rgba(0, 0, 0, 0.1))',
                zIndex: 100,
                width: '180px',
                marginTop: '8px'
              }}
            >
              <div 
                onClick={handleLeftSidebar}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-color, #e0e0e0)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>📋</span> Navigation
              </div>
              <div 
                onClick={handleRightSidebar}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>⚙️</span> Actions
              </div>
            </div>
          )}
        </div>
        
        <img 
          src={logo} // Use the imported logo
          alt="DoIt Logo"
          className="logo-image"
          style={{ height: '35px', marginRight: '8px' }}
        />
        <h1 className="header-title">DoIt</h1>
      </div>
      
      <div className="header-right">
        <div className="header-icons" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ViewToggle />
          <ThemeToggle />
          <button
            className="logout-button"
            onClick={() => dispatch(logout())}
            style={{
              backgroundColor: '#24c650',
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Backdrop for closing menu when clicking outside */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;