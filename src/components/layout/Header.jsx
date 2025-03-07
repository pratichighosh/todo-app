import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import ThemeToggle from '../ui/ThemeToggle';
import ViewToggle from '../ui/ViewToggle';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button">
          <span className="menu-icon">☰</span>
        </button>
        <img 
          src="/logo512.png"
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
    </header>
  );
};

export default Header;