import { apiUrl } from '../contexts/constants';
import axios from 'axios';

const RecruitmentAPI = {
  getRecruitment: async () => {
    try {
      const response = await axios.get(`${apiUrl}/recruitment?page=0`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getRecruitmentPage: async (currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/recruitment?page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getRecruitmentById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/recruitment/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  createRecruitment: async (variable) => {
    try {
      const response = await axios.post(`${apiUrl}/recruitment`, variable);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },
};

export default RecruitmentAPI;
