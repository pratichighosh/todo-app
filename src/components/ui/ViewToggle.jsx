import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleViewMode } from '../redux/slices/uiSlice';

const ViewToggle = () => {
  const dispatch = useDispatch();
  const { viewMode } = useSelector(state => state.ui);
  
  const handleToggle = () => {
    dispatch(toggleViewMode());
  };
  
  return (
    <button 
      className="view-toggle-button"
      onClick={handleToggle}
      aria-label={`Switch to ${viewMode === 'list' ? 'card' : 'list'} view`}
      style={{
        backgroundColor: 'transparent', // Remove background color
        padding: '8px',
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        boxShadow: viewMode === 'list' 
          ? '0 4px 8px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1)' // Lighter shadow for 'list' view
          : '0 4px 8px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.1)', // Slightly darker shadow for 'card' view
        transition: 'all 0.2s ease'
      }}
    >
      {viewMode === 'list' ? '📊' : '📋'}
    </button>
  );
};

export default ViewToggle;
