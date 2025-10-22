import { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast.jsx';
import styles from './ToastProvider.module.css';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      position: 'top-right',
      ...toast
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addToast({
      type: 'success',
      message,
      title: 'Éxito',
      ...options
    });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({
      type: 'error',
      message,
      title: 'Error',
      ...options
    });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({
      type: 'warning',
      message,
      title: 'Advertencia',
      ...options
    });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({
      type: 'info',
      message,
      title: 'Información',
      ...options
    });
  }, [addToast]);

  const value = {
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
