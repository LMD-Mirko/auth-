import apiClient from '../../../config/api.js';
import Cookies from 'js-cookie';

export const userService = {
  async logout() {
    try {
      await apiClient.delete('logout');
    } catch (error) {
      throw error;
    } finally {
      Cookies.remove('auth_token');
    }
  }
};
