import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/thunks/authThunks';
import { updateUserProfile, logout } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(state => state.auth);
  
  const login = async (credentials) => {
    return await dispatch(loginUser(credentials));
  };
  
  const register = async (userData) => {
    return await dispatch(registerUser(userData));
  };
  
  const logoutUser = () => {
    dispatch(logout());
  };
  
  const updateProfile = (profileData) => {
    dispatch(updateUserProfile(profileData));
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: logoutUser,
    updateProfile,
  };
};

export default useAuth;