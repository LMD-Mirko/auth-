import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { profileService } from '../services/profileService.js';

// Hook personalizado para manejar el perfil
export const useProfile = () => {
  const { profile, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshProfile = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const profileData = await profileService.getProfile();
      return profileData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedProfile = await profileService.updateProfile(profileData);
      return updatedProfile;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    refreshProfile,
    updateProfile
  };
};
