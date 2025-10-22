import apiClient from '../../../config/api.js';

export const profileService = {
  async getProfile() {
    try {
      const response = await apiClient.get('profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};