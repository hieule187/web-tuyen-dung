import { apiUrl } from '../contexts/constants';
import axios from 'axios';

const AccountAPI = {
  getAccountManagement: async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/account/account-management?page=0`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getAccountManagementPage: async (currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/account/account-management?page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchAccountManagement: async (key) => {
    try {
      const response = await axios.get(
        `${apiUrl}/account/search-account-management?key=${key}&page=0`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchAccountManagementPage: async (key, currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/account/search-account-management?key=${key}&page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  lockAccountById: async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/account/lock/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  unlockAccountById: async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/account/unlock/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },
};

export default AccountAPI;
