import { useState } from 'react';
import { useAuth } from './useAuth.js';

// Hook personalizado para manejar el login
export const useLogin = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: ''
    });
    clearError();
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    resetForm,
    isLoading,
    error
  };
};
