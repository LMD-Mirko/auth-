import apiClient from '../../../config/api.js';
import Cookies from 'js-cookie';

export const authService = {
  async login(data) {
    try {
      Cookies.remove('auth_token');
      const response = await apiClient.post('login', data);
      const { token } = response.data;
      Cookies.set('auth_token', token, { expires: 7 });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(data) {
    try {
      Cookies.remove('auth_token');
      const response = await apiClient.post('register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated() {
    return !!Cookies.get('auth_token');
  },

  getToken() {
    return Cookies.get('auth_token');
  }
};
