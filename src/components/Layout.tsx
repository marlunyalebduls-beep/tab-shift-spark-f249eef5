import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  accounts: 'Управление аккаунтами',
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

  // Page transition variants - using inline for simpler typing
  const pageTransition = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 }
  };

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
        {/* Hide title on mobile for home page */}
        <motion.div 
          key={`title-${activeTab}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={activeTab === 'home' ? 'hidden md:block' : ''}
        >
          <h1 className="text-2xl md:text-[28px] font-bold text-foreground mb-1">
            {title}
          </h1>
          {activeTab === 'home' && (
            <p className="text-sm text-muted-foreground mb-4 md:mb-5">
              Основная страница с навигацией по сайту
            </p>
          )}
          {activeTab === 'accounts' && (
            <p className="text-sm text-muted-foreground mb-4 md:mb-5">
              Аккаунты готовые к заказу либо нуждающиеся в догреве
            </p>
          )}
          {activeTab !== 'home' && activeTab !== 'accounts' && <div className="mb-4 md:mb-5" />}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={{ duration: 0.3 }}
          >
            <Outlet context={{ user, onOpenAuth: openAuthModal }} />
          </motion.div>
        </AnimatePresence>
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
