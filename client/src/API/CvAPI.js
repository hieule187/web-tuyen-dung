import { apiUrl } from '../contexts/constants';
import axios from 'axios';

const CvAPI = {
  createCv: async (variable) => {
    try {
      const response = await axios.post(`${apiUrl}/cv`, variable);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getCvByRecruitmentId: async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/by-recruitment/${id}?page=0`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getCvByRecruitmentIdPage: async (id, currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/by-recruitment/${id}?page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  browseCvById: async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/cv/browse-cv/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  missCvById: async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/cv/miss-cv/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },
};

export default CvAPI;
