import { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    registerStart, 
    registerSuccess, 
    registerFailure,
    logout as logoutAction
  } from '../slices/authSlice';
  
  // For demo purposes, we'll simulate API calls
  export const loginUser = (credentials) => async (dispatch) => {
    try {
      dispatch(loginStart());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials - for demo, accept any email with a password length >= 6
      if (!credentials.email || credentials.password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // Mock user data for demo
      const userData = {
        id: '1',
        name: credentials.email.split('@')[0], // Use part of email as name
        email: credentials.email,
        avatar: '/assets/images/default-avatar.png',
      };
      
      // Store token in localStorage - in a real app, this would be a JWT
      localStorage.setItem('authToken', 'demo-token-123');
      
      dispatch(loginSuccess(userData));
      return { success: true };
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed'));
      return { success: false, error: error.message };
    }
  };
  
  export const registerUser = (userData) => async (dispatch) => {
    try {
      dispatch(registerStart());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation - for demo purposes
      if (!userData.email || !userData.name || userData.password.length < 6) {
        throw new Error('Invalid registration data');
      }
      
      // Mock user data
      const newUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        avatar: '/assets/images/default-avatar.png',
      };
      
      // Store token in localStorage - in a real app, this would be a JWT
      localStorage.setItem('authToken', 'demo-token-123');
      
      dispatch(registerSuccess(newUser));
      return { success: true };
    } catch (error) {
      dispatch(registerFailure(error.message || 'Registration failed'));
      return { success: false, error: error.message };
    }
  };
  
  export const logoutUser = () => (dispatch) => {
    dispatch(logoutAction());
    // Additional cleanup if needed
    return { success: true };
  };