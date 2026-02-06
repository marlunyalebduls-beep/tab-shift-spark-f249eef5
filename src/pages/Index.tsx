import React, { useState, useEffect } from 'react';
import { CanvasBackground } from '@/components/CanvasBackground';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileSidebar } from '@/components/MobileSidebar';
import { BottomNav } from '@/components/BottomNav';
import { MainContent } from '@/components/MainContent';
import { AuthModal } from '@/components/modals/AuthModal';
import { SuccessModal } from '@/components/modals/SuccessModal';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { useNavigation } from '@/hooks/useNavigation';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);

  const {
    activeTab,
    navigateTo,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar,
  } = useNavigation('home');

  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
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
  } = useAuth();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show layout after loading screen fades
      setTimeout(() => {
        setIsLayoutVisible(true);
      }, 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full w-full overflow-hidden md:gradient-mobile-bg">
      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Canvas Background (Desktop only) */}
      <CanvasBackground />

      {/* Mobile Header */}
      <MobileHeader
        user={user}
        onMenuClick={toggleMobileSidebar}
        isVisible={isLayoutVisible}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
        activeTab={activeTab}
        onNavigate={navigateTo}
        user={user}
        onOpenAuth={openAuthModal}
        onOpenProfile={openProfileModal}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={navigateTo}
        user={user}
        onOpenAuth={openAuthModal}
        onOpenProfile={openProfileModal}
        isVisible={isLayoutVisible}
      />

      {/* Main Content */}
      <MainContent
        activeTab={activeTab}
        user={user}
        onOpenAuth={openAuthModal}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={navigateTo}
        isVisible={isLayoutVisible}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={login}
        isLoading={isAuthLoading}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        onLogout={logout}
        user={user}
      />
    </div>
  );
};

export default Index;
