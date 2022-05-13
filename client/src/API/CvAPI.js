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

  getCvById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/cv/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchCvByRecruitmentId: async (id, key) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/search-by-recruitment/${id}?key=${key}&page=0`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchCvByRecruitmentIdPage: async (id, key, currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/search-by-recruitment/${id}?key=${key}&page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getMyCv: async () => {
    try {
      const response = await axios.get(`${apiUrl}/cv/my-cv?page=0`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getMyCvPage: async (currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/my-cv?page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchMyCv: async (key) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/search-my-cv?key=${key}&page=0`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  getSearchMyCvPage: async (key, currentPage) => {
    try {
      const response = await axios.get(
        `${apiUrl}/cv/search-my-cv?key=${key}&page=${currentPage}`,
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  },

  deleteCvById: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/cv/${id}`);
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
