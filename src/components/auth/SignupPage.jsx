import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/thunks/authThunks';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Name is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email is invalid');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }));
      
      if (!result.success) {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#006400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h1 style={{ color: '#006400' }}>TaskMaster</h1>
        </div>
      </div>
      
      <div className="auth-card">
        <h2 className="auth-title" style={{ color: '#24c650' }}>Create Account</h2>
        
        {error && (
          <div className="error-container" style={{
            padding: '0.75rem',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: 'var(--border-radius)',
            marginBottom: '1rem',
            color: '#d32f2f',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="name" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Full Name
            </label>
            <div className="input-container" style={{ 
              position: 'relative',
              marginBottom: '1.25rem'
            }}>
              <div style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-secondary)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="email" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <div className="input-container" style={{ 
              position: 'relative',
              marginBottom: '1.25rem'
            }}>
              <div style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-secondary)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Password
            </label>
            <div className="input-container" style={{ position: 'relative', marginBottom: '1.25rem' }}>
              <div style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-secondary)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="confirmPassword" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Confirm Password
            </label>
            <div className="input-container" style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-secondary)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
            style={{ 
              marginTop: '1rem',
              backgroundColor: isLoading ? 'var(--border-color)' : 'var(--primary-color, #24c650)'
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg
                  className="spinner"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="30 60"
                  />
                </svg>
                Creating Account...
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        <div className="auth-switch">
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Already have an account? 
            <Link
              to="/login"
              className="auth-switch-button"
              style={{ 
                marginLeft: '0.25rem',
                color: 'var(--primary-color, #24c650)'
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <div className="auth-footer">
        &copy; 2025 TaskMaster. All rights reserved.
      </div>
    </div>
  );
};

export default SignupPage;