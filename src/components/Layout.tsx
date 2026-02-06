import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CanvasBackground } from '@/components/CanvasBackground';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileSidebar } from '@/components/MobileSidebar';
import { BottomNav } from '@/components/BottomNav';
import { AuthModal } from '@/components/modals/AuthModal';
import { SuccessModal } from '@/components/modals/SuccessModal';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { useAuth } from '@/hooks/useAuth';
import { NavItem } from '@/types/navigation';

const routeToTab: Record<string, NavItem> = {
  '/': 'home',
  '/accounts': 'accounts',
  '/order': 'order',
  '/warmup': 'warmup',
  '/emulator': 'emulator',
  '/faq': 'faq',
  '/config': 'config',
  '/payment': 'payment',
  '/chat': 'chat',
  '/admin': 'admin',
};

const tabTitles: Record<NavItem, string> = {
  home: 'Главная',
  accounts: 'Аккаунты',
  order: 'Заказ товара',
  warmup: 'Прогрев',
  emulator: 'Эмулятор управления',
  faq: 'FAQ',
  config: 'Конфигурация фермы',
  payment: 'Пополнение',
  chat: 'Чат поддержки',
  admin: 'Админ панель',
};

const Layout: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const activeTab = routeToTab[location.pathname] || 'home';
  const title = tabTitles[activeTab];

  const {
    user,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsLayoutVisible(true);
      }, 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex h-full w-full overflow-hidden md:gradient-mobile-bg">
      <LoadingScreen isVisible={isLoading} />
      <CanvasBackground />

      <MobileHeader
        user={user}
        onMenuClick={toggleMobileSidebar}
        isVisible={isLayoutVisible}
      />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
        activeTab={activeTab}
        user={user}
        onOpenAuth={openAuthModal}
        onOpenProfile={openProfileModal}
      />

      <Sidebar
        activeTab={activeTab}
        user={user}
        onOpenAuth={openAuthModal}
        onOpenProfile={openProfileModal}
        isVisible={isLayoutVisible}
      />

      <main className="flex-1 p-5 md:p-[30px] overflow-y-auto z-[5] relative transition-all duration-400 mt-[65px] mb-[70px] md:mt-0 md:mb-0 min-h-[calc(100vh-135px)] md:min-h-0">
        <h1 className="text-2xl md:text-[28px] font-normal text-foreground mb-4 md:mb-5 transition-all duration-400">
          {title}
        </h1>
        <Outlet context={{ user, onOpenAuth: openAuthModal }} />
      </main>

      <BottomNav
        activeTab={activeTab}
        isVisible={isLayoutVisible}
      />

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

export default Layout;
