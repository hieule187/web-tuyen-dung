import React, { createContext, useReducer, useState, useEffect } from 'react';
import { accountReducer } from '../reducers/accountReducer';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from './constants';
import setAuthToken from '../utils/setAuthToken';

export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [accountState, dispatch] = useReducer(accountReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: {},
  });

  const [showSignupPostModal, setShowSignupPostModal] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/account/authenticated`);
      if (response.data.success) {
        dispatch({
          type: SET_AUTH,
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: {
          isAuthenticated: false,
          user: {},
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/account/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Signup candidate
  const signupCandidate = async (userForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/account/signup-candidate`,
        userForm,
      );
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Signup recruiter
  const signupRecruiter = async (userForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/account/signup-recruiter`,
        userForm,
      );
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: SET_AUTH,
      payload: {
        isAuthenticated: false,
        user: {},
      },
    });
  };

  // Context data
  const accountContextData = {
    loginUser,
    logoutUser,
    signupCandidate,
    signupRecruiter,
    accountState,
    showSignupPostModal,
    setShowSignupPostModal,
    quickSearch,
    setQuickSearch,
  };

  // Return provider
  return (
    <AccountContext.Provider value={accountContextData}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
