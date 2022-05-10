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

  getMyRecruitment: async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/recruitment/my-recruitment?page=0`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getMyRecruitmentPage: async (currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/recruitment/my-recruitment?page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  updateRecruitmentById: async (id, variable) => {
    try {
      const response = await axios.put(`${apiUrl}/recruitment/${id}`, variable);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  deleteRecruitmentById: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/recruitment/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  lockRecruitmentById: async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/recruitment/lock-recruitment/${id}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  unlockRecruitmentById: async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/recruitment/unlock-recruitment/${id}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchMyRecruitment: async (variable) => {
    try {
      const response = await axios.get(
        `${apiUrl}/recruitment/search-my-recruitment/?key=${variable}&page=0`,
        variable,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchMyRecruitmentPage: async (variable, currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/recruitment/search-my-recruitment?key=${variable}&page=${currentPage}`,
        variable,
      );
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
