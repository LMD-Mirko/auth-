import { useState } from 'react';
import { useAuth } from './useAuth.js';

// Hook personalizado para manejar el registro
export const useRegister = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    document_number: '',
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    phone: '',
    user_name: '',
    password: '',
    confirm_password: '',
    last_session: new Date().toISOString().split('T')[0],
    account_statement: true,
    document_type_id: 1,
    country_id: 179
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirm_password) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    // Remover confirm_password del objeto antes de enviar
    const { confirm_password, ...dataToSend } = formData;
    
    try {
      await register(dataToSend);
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      document_number: '',
      name: '',
      paternal_lastname: '',
      maternal_lastname: '',
      email: '',
      phone: '',
      user_name: '',
      password: '',
      confirm_password: '',
      last_session: new Date().toISOString().split('T')[0],
      account_statement: true,
      document_type_id: 1,
      country_id: 179
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
