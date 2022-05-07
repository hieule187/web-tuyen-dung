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
};

export default CvAPI;
