import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate circle values
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;
  
  return (
    <aside className="sidebar">
      {/* Add user avatar section at the top */}
      <div className="sidebar-user">
        <img
          src="/src/assets/images/default-avatar.png"
          alt="User Avatar"
          className="sidebar-avatar"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            margin: '1rem auto',
            display: 'block',
             boxShadow: '0 0 10px 4px rgba(33, 199, 33, 0.7)'
          }}
        />
        <p className="sidebar-username" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {user?.name || 'Guest'}
        </p>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">📅</span>
              <span className="nav-text">Calendar</span>
            </NavLink>
          </li>
          
          <li className="nav-item">
  <span className="nav-link">
    <span className="nav-icon">✓</span>
    <span className="nav-text">My Tasks</span>
  </span>
</li>

        </ul>
      </nav>
      
      <div className="progress-section">
        <h3 className="progress-title">Tasks</h3>
        <div className="circular-progress-container" style={{ textAlign: 'center', margin: '1rem 0' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="var(--primary-color, #4cd964)"
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            {/* Percentage text */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="bold"
              fill="var(--text-color, #333)"
            >
              {completionPercentage}%
            </text>
          </svg>
          <div className="progress-info" style={{ marginTop: '0.5rem' }}>
            <p>{completedTasks}/{totalTasks} tasks completed</p>
          </div>
        </div>
      </div>
      
      <div className="categories-section">
        <h3 className="categories-title">Categories</h3>
        <ul className="categories-list">
          <li className="category-item">
            <span className="category-color green"></span>
            <span className="category-name">Personal</span>
          </li>
          <li className="category-item">
            <span className="category-color blue"></span>
            <span className="category-name">Work Items</span>
          </li>
          <li className="category-item">
            <span className="category-color orange"></span>
            <span className="category-name">Shopping</span>
          </li>
          <li className="category-item">
            <span className="category-color purple"></span>
            <span className="category-name">Other things</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;