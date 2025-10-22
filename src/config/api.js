import axios from 'axios';
import Cookies from 'js-cookie';

const BaseURL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api/';

const instance = axios.create({
  baseURL: BaseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token') || null;
    const isAuthEndpoint = config.url === 'login' || config.url === 'register';
    
    if (isAuthEndpoint) {
      delete config.headers.Authorization;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response?.status == 401 || error.response?.status == 403) &&
      window.location.pathname.includes('/profile')
    ) {
      Cookies.remove('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
