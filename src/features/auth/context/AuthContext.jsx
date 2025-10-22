import { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService.js';
import { userService } from '../services/userService.js';
import { profileService } from '../../profile/services/profileService.js';

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  LOGOUT: 'LOGOUT',
  LOAD_PROFILE: 'LOAD_PROFILE',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_ERROR:
    case AUTH_ACTIONS.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      const response = await authService.login(credentials);
      
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response });
      
      return response;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });
      const response = await authService.register(userData);
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: response });
      return response;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.REGISTER_ERROR, payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      // Error silencioso - el logout local se ejecuta de todas formas
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const loadProfile = async () => {
    try {
      const profile = await profileService.getProfile();
      dispatch({ type: AUTH_ACTIONS.LOAD_PROFILE, payload: profile });
      return profile;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    loadProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
