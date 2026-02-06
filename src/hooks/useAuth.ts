import { useState, useCallback } from 'react';
import { User } from '@/types/navigation';

// Demo user for showing authenticated state
const demoUser: User = {
  first_name: 'Telegram User',
  telegram_id: '123456789',
  username: 'demo_user',
  balance: 1250,
  role: 'user',
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const openProfileModal = useCallback(() => {
    if (user) {
      setIsProfileModalOpen(true);
    }
  }, [user]);

  const closeProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
  }, []);

  // Simulate login process
  const login = useCallback(() => {
    setIsLoading(true);
    
    // Simulate auth delay
    setTimeout(() => {
      setUser(demoUser);
      setIsAuthModalOpen(false);
      setIsLoading(false);
      
      // Show success modal after short delay
      setTimeout(() => {
        setIsSuccessModalOpen(true);
      }, 300);
    }, 1500);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsProfileModalOpen(false);
  }, []);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    isAuthModalOpen,
    isSuccessModalOpen,
    isProfileModalOpen,
    openAuthModal,
    closeAuthModal,
    openProfileModal,
    closeProfileModal,
    closeSuccessModal,
    login,
    logout,
  };
}
