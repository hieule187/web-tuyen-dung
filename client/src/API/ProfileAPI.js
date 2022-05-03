import { apiUrl } from '../contexts/constants';
import axios from 'axios';

const ProfileAPI = {
  createProfile: async (variable) => {
    try {
      const response = await axios.post(`${apiUrl}/profile/create`, variable);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getProfile: async () => {
    try {
      const response = await axios.get(`${apiUrl}/profile`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  updateProfile: async (variable) => {
    try {
      const response = await axios.post(`${apiUrl}/profile/update`, variable);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },
};

export default ProfileAPI;
